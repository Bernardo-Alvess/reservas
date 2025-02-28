import { IsString, IsNotEmpty } from 'class-validator';

export class WorkHoursDto {
    @IsString()
    @IsNotEmpty()
    day: string;

    @IsString()
    @IsNotEmpty()
    open: string;

    @IsString()
    @IsNotEmpty()
    close: string;
}
