import { Document, Schema, model } from 'mongoose';

interface IInvite extends Document {
  guild_id: string;
  user_id: string;
  invited_by: string;
  amount: number
};

const inviteSchema = new Schema<IInvite>(
  {
    guild_id: { type: String, required: true, index: true },
    user_id: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    invited_by: Number
  }
);

inviteSchema.index({ guild_id: 1, user_id: 1 }, { unique: true });

const Invite = model<IInvite>('Invite', inviteSchema);

export default Invite;
