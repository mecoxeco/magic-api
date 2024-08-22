import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { Deck } from './deck.schema';

@Controller('decks')
export class DeckController {
    constructor(private readonly deckService: DeckService) { }

    @Post()
    async createDeck(@Body() createDeckDto: CreateDeckDto): Promise<Deck> {
        return this.deckService.createDeck(createDeckDto.commanderName);
    }

    @Get(':id')
    async getDeck(@Param('id') id: string): Promise<Deck> {
        return this.deckService.getDeckById(id);
    }
}
