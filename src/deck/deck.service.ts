import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck, DeckDocument } from './deck.schema';
import { Card } from '../cards/cards.schema';
import axios from 'axios';

@Injectable()
export class DeckService {
    private readonly scryfallApiUrl = 'https://api.scryfall.com/cards/search';

    constructor(
        @InjectModel(Deck.name) private readonly deckModel: Model<DeckDocument>,
    ) { }

    async createDeck(commanderName: string): Promise<Deck> {
        const commanderResponse = await axios.get(`https://api.scryfall.com/cards/named?exact=${commanderName}`);

        if (!commanderResponse.data) {
            throw new NotFoundException('Commander not found');
        }

        const commander = commanderResponse.data;
        const colors = commander.color_identity.join('');

        const cardsResponse = await axios.get(this.scryfallApiUrl, {
            params: {
                q: `c:${colors}`,
                order: 'cmc',
                unique: 'cards',
                pageSize: 99,
            },
        });

        const cards = cardsResponse.data.data.map(cardData => ({
            name: cardData.name,
            manaCost: cardData.mana_cost,
            type: cardData.type_line,
            rarity: cardData.rarity,
            colors: cardData.colors,
        }));

        const deck = new this.deckModel({
            name: commanderName,
            commander: commander.name,
            cards,
        });

        return deck.save();
    }

    async getDeckById(id: string): Promise<Deck> {
        const deck = await this.deckModel.findById(id).populate('cards').exec();
        if (!deck) {
            throw new NotFoundException('Deck not found');
        }
        return deck;
    }
}