import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrCodeService {
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
  }

  /**
   * Gera uma URL de QR code para check-in no restaurante
   * @param restaurantId ID do restaurante
   * @returns URL da imagem do QR code em formato Data URL
   */
  async generateQrCodeForRestaurant(restaurantId: string): Promise<string> {
    //Gerar o link para o frontend
    const checkinUrl = `${this.baseUrl}/reserve/checkin/${restaurantId}`;

    try {
      // Gera o QR code como data URL (imagem em base64)
      const qrCodeDataUrl = await QRCode.toDataURL(checkinUrl, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 300,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      return qrCodeDataUrl;
    } catch (error) {
      throw new Error(`Erro ao gerar QR code: ${error.message}`);
    }
  }

  /**
   * Gera uma string ASCII do QR code para visualização em terminal
   * @param restaurantId ID do restaurante
   * @returns Representação ASCII do QR code
   */
  async generateQrCodeTextForRestaurant(restaurantId: string): Promise<string> {
    const checkinUrl = `${this.baseUrl}/reserve/checkin/${restaurantId}`;

    try {
      const qrCodeText = await QRCode.toString(checkinUrl, {
        type: 'terminal',
        errorCorrectionLevel: 'H',
      });

      return qrCodeText;
    } catch (error) {
      throw new Error(`Erro ao gerar QR code texto: ${error.message}`);
    }
  }
}
