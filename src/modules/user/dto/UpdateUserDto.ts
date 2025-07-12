import { IsEnum, IsOptional } from 'class-validator';

import { IsString } from 'class-validator';
import { UserTypeEnum } from '../user.schema';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  type?: UserTypeEnum;

  @IsString()
  @IsOptional()
  restaurantId?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
