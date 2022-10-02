import { Invite } from 'discord.js';

import { Bot } from '../bot';

export default function inviteDelete(
  bot: Bot,
  invite: Invite
) {
  bot.invites
    .get(invite.guild.id)
    .delete(invite.code);
}
