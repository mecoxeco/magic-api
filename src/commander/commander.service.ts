import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commander, CommanderDocument } from './commander.schema';
import axios from 'axios';

@Injectable()
export class CommanderService {
    private readonly scryfallApiUrl = 'https://api.scryfall.com/cards/search';

    constructor(
        @InjectModel(Commander.name) private readonly commanderModel: Model<CommanderDocument>,
    ) { }

    async createCommander(name: string): Promise<Commander> {
        const response = await axios.get(this.scryfallApiUrl, {
            params: {
                q: `type:commander name:"${name}"`,
            },
        });

        if (!response.data.data.length) {
            throw new NotFoundException('Commander not found');
        }

        const commanderData = response.data.data[0];

        // Cria e salva o comandante
        const commander = new this.commanderModel({
            name: commanderData.name,
            colors: commanderData.colors,
            manaCost: commanderData.mana_cost,
            type: commanderData.type_line,
        });

        return commander.save();
    }

    async getCommanderById(id: string): Promise<Commander> {
        const commander = await this.commanderModel.findById(id).exec();
        if (!commander) {
            throw new NotFoundException('Commander not found');
        }
        return commander;
    }
}
