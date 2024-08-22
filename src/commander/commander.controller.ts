import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { Commander } from './commander.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('commanders')
@Controller('commanders')
export class CommanderController {
    constructor(private readonly commanderService: CommanderService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Obtém um comandante pelo ID' })
    @ApiResponse({
        status: 200,
        description: 'Comandante retornado com sucesso.',
        type: Commander,
    })
    async getCommander(@Param('id') id: string): Promise<Commander> {
        return this.commanderService.getCommanderById(id);
    }
}