import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
@Injectable()
export class QrCodeService {
  async generateQrCode(restaurantId: string) {
    let url;

    if (process.env.NODE_ENV === 'production') {
      url = `${process.env.PRODUCTION_URL}/confirm-reservation/${restaurantId}`;
    } else {
      url = `http://localhost:3000/confirm-reservation/${restaurantId}`;
    }

    const qrCode = await QRCode.toDataURL(url);
    return qrCode;
  }
}
