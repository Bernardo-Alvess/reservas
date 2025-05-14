import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateRestaurantDto } from './CreateRestaurantDto';

export class UpdateRestaurantDto extends CreateRestaurantDto {
  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
    description: 'URL do QR code para check-in',
    required: false,
  })
  @IsString()
  @IsOptional()
  qrCodeUrl?: string;
}
