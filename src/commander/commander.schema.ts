import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CommanderDocument = Commander & Document;

@Schema()
export class Commander {
    @ApiProperty({
        description: 'Nome do comandante',
        example: 'Atraxa, Praetors\' Voice',
    })
    @Prop({ required: true })
    name: string;

    @ApiProperty({
        description: 'Cores do comandante',
        example: ['W', 'B', 'G', 'U'],
    })
    @Prop([String])
    colors: string[];

    @ApiProperty({
        description: 'Custo de mana do comandante',
        example: '{G}{W}{U}{B}',
    })
    @Prop()
    manaCost: string;

    @ApiProperty({
        description: 'Tipo do comandante',
        example: 'Legendary Creature — Angel Horror',
    })
    @Prop()
    type: string;
}

export const CommanderSchema = SchemaFactory.createForClass(Commander);
