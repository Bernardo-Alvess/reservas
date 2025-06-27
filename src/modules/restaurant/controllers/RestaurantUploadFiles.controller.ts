import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CloudinaryService } from '../services/Cloudinary.service';
import * as fs from 'fs';
@Controller('restaurant/upload')
export class RestaurantUploadFilesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('/:restaurantId/profile')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Tipo de arquivo inválido.'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('restaurantId') restaurantId: string,
  ) {
    return await this.cloudinaryService.uploadProfileImage(
      restaurantId,
      file,
      'restaurant-profile',
    );
  }

  @Delete('/:restaurantId/image')
  async deleteImage(
    @Body() publicId: { publicId: string },
    @Param('restaurantId') restaurantId: string,
  ) {
    return await this.cloudinaryService.deleteImageWithRestaurantId(
      publicId.publicId,
      restaurantId,
      'image',
    );
  }

  @Post('/:restaurantId/menu')
  @UseInterceptors(
    FileInterceptor('menu', {
      storage: diskStorage({
        destination: './uploads/pdfs',
        filename: (req, file, cb) => {
          const originalName = file.originalname
            .replace(/\s+/g, '-') // substitui espaços por hífen
            .replace(/[^a-zA-Z0-9.-]/g, '') // remove caracteres especiais
            .toLowerCase();

          const nameWithoutExt = originalName.replace(
            extname(originalName),
            '',
          );
          const uniqueSuffix = randomUUID().slice(0, 8); // opcional: usa parte do UUID

          const finalName = `${nameWithoutExt}-${uniqueSuffix}${extname(file.originalname)}`;
          cb(null, finalName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Apenas PDF é permitido.'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadMenuPDF(
    @UploadedFile() file: Express.Multer.File,
    @Param('restaurantId') restaurantId: string,
  ) {
    const result = await this.cloudinaryService.uploadPDF(
      restaurantId,
      file,
      'restaurant-menu',
    );

    fs.unlinkSync(file.path);

    return result;
  }

  @Post('/:restaurantId/gallery')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Tipo de arquivo inválido.'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadGalleryImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('restaurantId') restaurantId: string,
  ) {
    const results = await this.cloudinaryService.uploadGalleryImages(
      restaurantId,
      files,
    );
    return results;
  }
}
