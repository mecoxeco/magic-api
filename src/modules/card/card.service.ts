import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CardService {
    private readonly SCRYFALL_API_BASE_URL = 'https://api.scryfall.com';

    async getCardById(id: string) {
        try {
            const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/${id}`);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Carta não encontrada.');
        }
    }

}
