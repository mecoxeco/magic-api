import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Card } from '../cards/cards.schema';

export type DeckDocument = Deck & Document;

@Schema()
export class Deck {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    commander: string;

    @Prop([{ type: Object, ref: 'Card' }])
    cards: Card[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
