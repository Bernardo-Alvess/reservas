import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageOptionsDto } from './PageOptionsDto';

export class PageMetaDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  constructor({ totalItems, pageOptionsDto }: PageMetaDtoParameters) {
    this.totalItems = totalItems;
    this.limit = pageOptionsDto.limit;
    this.totalPages = Math.ceil(this.totalItems / pageOptionsDto.limit);
    this.currentPage = pageOptionsDto.page;
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPages;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  totalItems: number;
}

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
