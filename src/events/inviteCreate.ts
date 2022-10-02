import { Invite } from 'discord.js';

import { Bot } from '../bot';
import { Logs } from '../services/logs';

export default function inviteCreate(
  bot: Bot,
  invite: Invite
) {
  bot.invites
    .get(invite.guild.id)
    .set(invite.code, invite.uses);

  Logs.info('[+] Invite ' + invite.code)
}
  