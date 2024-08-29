import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommanderService } from './commander.service';

@ApiTags('commanders')
@Controller('commanders')
export class CommanderController {
    constructor(private readonly commanderService: CommanderService) { }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID do comandante' })
    @ApiOperation({ summary: 'Obter um comandante por ID' })
    @ApiResponse({ status: 200, description: 'Retorna um comandante.' })
    async getCommanderById(@Param('id') id: string) {
        return this.commanderService.getCommanderById(id);
    }

    @Get('/color/:color')
    @ApiParam({ name: 'color', description: 'Cor do comandante' })
    @ApiOperation({ summary: 'Obter um comandante por cor' })
    @ApiResponse({ status: 200, description: 'Retorna um comandante.' })
    async getCommanderByColor(@Param('color') color: string) {
        return this.commanderService.getCommanderByColor(color);
    }

    @Get('/random')
    @ApiOperation({ summary: 'Obter um comandante aleatório' })
    @ApiResponse({ status: 200, description: 'Retorna um comandante aleatório.' })
    async getRandomCommander() {
        return this.commanderService.getRandomCommander();
    }
}
