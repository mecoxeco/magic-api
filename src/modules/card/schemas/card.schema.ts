import { Schema, Document } from 'mongoose';

export interface Card extends Document {
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    colors: string[];
    image_uris: {
        normal: string;
    };
}

export const CardSchema = new Schema<Card>({
    name: { type: String, required: true },
    mana_cost: { type: String },
    type_line: { type: String },
    oracle_text: { type: String },
    colors: [{ type: String }],
    image_uris: {
        normal: { type: String },
    },
});
