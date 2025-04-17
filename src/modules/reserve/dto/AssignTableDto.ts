import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class AssignTableDto {
    @IsMongoId()
    @IsNotEmpty()
    tableId: string;
    // @IsDate()
    // @IsNotEmpty()
    // @Type(() => Date)
    // startTime: Date;
    // @IsDate()
    // @IsNotEmpty()
    // @Type(() => Date)
    // endTime: Date;
    @IsMongoId()
    @IsNotEmpty()
    reserveId: string;
}
