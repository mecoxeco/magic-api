import { Schema } from 'mongoose';

export const CommanderSchema = new Schema({
    name: String,
    mana_cost: String,
    type_line: String,
    oracle_text: String,
    colors: [String],
    image_uris: {
        normal: String,
    },
});
