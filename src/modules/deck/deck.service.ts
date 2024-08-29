import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from './schemas/deck.schema';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DeckService {
    private readonly SCRYFALL_API_BASE_URL = 'https://api.scryfall.com';

    constructor(@InjectModel('Deck') private readonly deckModel: Model<Deck>) { }

    async createDeck(commanderId: string) {
        const commander = await this.getCommanderById(commanderId);
        const color = commander.colors.join('');
        const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/search?q=color:${color}`);
        const deckCards = response.data.data.slice(0, 99);

        const deck = new this.deckModel({
            commander: commanderId,
            cards: deckCards.map(card => card.id),
        });

        return deck.save();
    }

    async getAllDecks() {
        return this.deckModel.find().exec();
    }

    async deleteDeck(id: string) {
        const result = await this.deckModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Deck não encontrado.');
        }
        return result;
    }

    async createRandomDeck() {
        const randomCommander = await this.getRandomCommander();
        const color = randomCommander.colors.join('');
        const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/search?q=color:${color}`);
        const deckCards = response.data.data.slice(0, 99);

        const deck = new this.deckModel({
            commander: randomCommander.id,
            cards: deckCards.map(card => card.id),
        });

        return deck.save();
    }

    async saveDeckAsJson(id: string) {
        const deck = await this.deckModel.findById(id).exec();
        if (!deck) {
            throw new NotFoundException('Deck não encontrado.');
        }

        const filePath = path.join(__dirname, '..', '..', 'decks', `${id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(deck, null, 2));
        return { message: `Deck salvo como JSON em ${filePath}.` };
    }

    private async getCommanderById(id: string) {
        try {
            const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/${id}`);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Comandante não encontrado.');
        }
    }

    private async getRandomCommander() {
        try {
            const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/random?q=t:commander`);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Comandante não encontrado.');
        }
    }
}
