import "dotenv/config";
import { Document, model, Schema } from "mongoose";

export interface user_type extends Document {
  id: string;
  tag: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, default: "" },
  tag: { type: String, required: true, default: "" }
});

export const user_model = model<user_type>(`User`, UserSchema);