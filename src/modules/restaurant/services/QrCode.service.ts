import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
@Injectable()
export class QrCodeService {
  async generateQrCode(restaurantId: string) {
    const url = `http://localhost:3000/confirm-reservation/${restaurantId}`;
    const qrCode = await QRCode.toDataURL(url);
    console.log(qrCode);
    return qrCode;
  }
}
