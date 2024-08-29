import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CardService } from './card.service';

@ApiTags('cards')
@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) { }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID da carta' })
    @ApiOperation({ summary: 'Obter uma carta por ID' })
    @ApiResponse({ status: 200, description: 'Retorna uma carta.' })
    async getCardById(@Param('id') id: string) {
        return this.cardService.getCardById(id);
    }

}
