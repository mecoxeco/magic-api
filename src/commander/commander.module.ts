import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommanderService } from './commander.service';
import { CommanderController } from './commander.controller';
import { Commander, CommanderSchema } from './commander.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Commander.name, schema: CommanderSchema }]),
  ],
  controllers: [CommanderController],
  providers: [CommanderService],
  exports: [CommanderService],
})
export class CommanderModule {}
