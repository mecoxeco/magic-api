import { Controller, Get, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Get()
  @ApiQuery({ name: 'color', required: true, type: String })
  async findCardsByColor(@Query('color') color: string) {
    return await this.cardsService.getCardsByColor(color);
  }
}
