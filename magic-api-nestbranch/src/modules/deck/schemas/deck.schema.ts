import { Schema, Document } from 'mongoose';

export interface Deck extends Document {
    commander: string;
    cards: string[];
}

export const DeckSchema = new Schema({
    commander: { type: String, required: true },
    cards: [{ type: String }],
});
