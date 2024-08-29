import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommanderController } from './commander.controller';
import { CommanderService } from './commander.service';
import { CommanderSchema } from './schemas/commander.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Commander', schema: CommanderSchema }]),
    ],
    controllers: [CommanderController],
    providers: [CommanderService],
})
export class CommanderModule { }
