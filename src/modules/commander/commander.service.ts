import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CommanderService {
    private readonly SCRYFALL_API_BASE_URL = 'https://api.scryfall.com';

    async getCommanderById(id: string) {
        try {
            const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/${id}`);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Comandante não encontrado.');
        }
    }

    async getCommanderByColor(color: string) {
        try {
            const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/search?q=t:commander+color:${color}`);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Comandante não encontrado.');
        }
    }

    async getRandomCommander() {
        try {
            const response = await axios.get(`${this.SCRYFALL_API_BASE_URL}/cards/random?q=t:commander`);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Comandante não encontrado.');
        }
    }
}
