import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import * as sharp from 'sharp';
import { UseCaseRestaurantService } from './UseCaseRestaurant.service';
import { ReadRestaurantService } from './ReadRestaurant.service';

@Injectable()
export class CloudinaryService {
  constructor(
    private configService: ConfigService,
    private readonly useCaseRestaurantService: UseCaseRestaurantService,
    private readonly readRestaurantService: ReadRestaurantService,
  ) {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadProfileImage(
    restaurantId: string,
    file: Express.Multer.File,
    folder = 'restaurant-profile-images',
  ) {
    try {
      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: 1024, height: 1024, fit: 'inside' })
        .toFormat('webp', { quality: 80 })
        .toBuffer();

      const restaurant =
        await this.readRestaurantService.findRestaurantById(restaurantId);

      if (restaurant?.profileImage?.publicId) {
        await this.deleteImageWithoutRestaurantId(
          restaurant.profileImage.publicId,
          'image',
        );
      }

      const result = await this.uploadStream(compressedBuffer, folder);
      await this.useCaseRestaurantService.updateProfileImage(restaurantId, {
        url: result.secure_url,
        publicId: result.public_id,
      });

      return { url: result.secure_url, publicId: result.public_id };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao fazer upload da imagem de perfil: ' + error.message,
      );
    }
  }

  async uploadGalleryImages(
    restaurantId: string,
    files: Express.Multer.File[],
    folder = 'restaurant-images',
  ) {
    try {
      const uploadPromises = files.map(async (file) => {
        const compressedBuffer = await sharp(file.buffer)
          .resize({ width: 1024, height: 1024, fit: 'inside' })
          .toFormat('webp', { quality: 80 })
          .toBuffer();

        return new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          Readable.from(compressedBuffer).pipe(uploadStream);
        });
      });

      const filesUploaded = await Promise.all(uploadPromises);

      const gallery = filesUploaded.map((file) => ({
        url: file.secure_url,
        publicId: file.public_id,
      }));

      await this.useCaseRestaurantService.updateGallery(restaurantId, gallery);

      return filesUploaded.map((file) => ({
        url: file.secure_url,
        publicId: file.public_id,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao fazer upload das imagens da galeria: ' + error.message,
      );
    }
  }

  async uploadPDF(
    restaurantId: string,
    file: Express.Multer.File,
    folder = 'restaurant-pdfs',
  ) {
    try {
      const pdf = await cloudinary.uploader.upload(file.path, {
        folder,
        resource_type: 'raw',
        format: 'pdf',
        use_filename: true,
        unique_filename: false,
      });

      const restaurant =
        await this.readRestaurantService.findRestaurantById(restaurantId);

      if (restaurant?.menu?.publicId) {
        await this.deleteImageWithoutRestaurantId(
          restaurant.menu.publicId,
          'raw',
        );
      }

      await this.useCaseRestaurantService.updateMenu(restaurantId, {
        url: pdf.secure_url,
        publicId: pdf.public_id,
      });

      return { url: pdf.secure_url, publicId: pdf.public_id };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao fazer upload do PDF: ' + error.message,
      );
    }
  }

  private uploadStream(
    buffer: Buffer,
    folder: string,
  ): Promise<UploadApiResponse> {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        Readable.from(buffer).pipe(uploadStream);
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao fazer upload do stream: ' + error.message,
      );
    }
  }

  async deleteImageWithoutRestaurantId(
    publicId: string,
    resourceType: 'image' | 'raw' = 'image',
  ) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar imagem: ' + error.message,
      );
    }
  }

  async deleteImageWithRestaurantId(
    publicId: string,
    restaurantId: string,
    resourceType: 'image' | 'raw' = 'image',
  ) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });

      await this.useCaseRestaurantService.deleteGalleryImage(
        restaurantId,
        publicId,
      );

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar imagem: ' + error.message,
      );
    }
  }
}
