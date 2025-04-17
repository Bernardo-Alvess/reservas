import { Controller, Get, Param, Query } from "@nestjs/common";
import { ReadTableService } from "../services/ReadTable.service";

@Controller('table')
export class ReadTableController {
    constructor (
        private readonly readTableService: ReadTableService
    ) {}

    @Get('/list/:id')
    async getAllTables(@Param('id') restaurantId: string, @Query('isReserved') isReserved: boolean) {
        return await this.readTableService.listTables(restaurantId, isReserved);
    }
}