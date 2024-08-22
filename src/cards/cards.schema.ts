import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @ApiProperty({ description: 'Card name' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'Card Mana Cost' })
    @Prop()
    mana_cost?: string;

    @ApiProperty({ description: 'Card Color' })
    @Prop([String])
    colors?: string[];

    @ApiProperty({ description: 'Card Type' })
    @Prop()
    type_line?: string;

    @ApiProperty({ description: 'Card Rarity' })
    @Prop()
    rarity?: string;

    @ApiProperty({ description: 'Card Text' })
    @Prop()
    oracle_text?: string;

    @ApiProperty({ description: 'URL Card Image' })
    @Prop()
    image_url?: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
