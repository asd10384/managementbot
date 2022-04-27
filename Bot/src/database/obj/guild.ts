import "dotenv/config";
import { Document, model, Schema } from "mongoose";

export interface guild_type extends Document {
  id: string;
  name: string;
  prefix: string;
  role: string[];
}

const GuildSchema: Schema = new Schema({
  id: { type: String, required: true, default: "" },
  name: { type: String, default: "" },
  prefix: { type: String, default: (process.env.PREFIX) ? process.env.PREFIX : 'e;' },
  role: { type: Array, default: [] }
});

export const guild_model = model<guild_type>(`Guild`, GuildSchema);