import { Document, Schema, model } from 'mongoose';

interface IInvite extends Document {
  guild_id: string;
  user_id: string;
  invites: number;
  invited_by: string;
};

const inviteSchema = new Schema<IInvite>(
  {
    guild_id: { type: String, required: true, index: true },
    user_id: { type: String, required: true, index: true },
    invites: { type: Number, required: true, default: 0 },
    invited_by: { type: String, required: false },
  }
);

inviteSchema.index({ guild_id: 1, user_id: 1 }, { unique: true });

const Invite = model<IInvite>('Invite', inviteSchema);

export default Invite;
