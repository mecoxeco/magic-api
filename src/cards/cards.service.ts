import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './cards.schema';

@Injectable()
export class CardsService {
  private readonly scryfallApiUrl = 'https://api.scryfall.com/cards/search';

  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) { }

  async getCardsByColor(color: string): Promise<any> {
    const response = await axios.get(this.scryfallApiUrl, {
      params: {
        query: `c:${color}`,
        unique: 'cards',
        order: 'name',
        pageSize: 99,
      },
    });

    const cards = response.data.data;

    for (const card of cards) {
      await new this.cardModel(card).save();
    }

    return cards;
  }
}
