import { GuildMember } from 'discord.js';
import { Bot } from '../bot';

import RequestsDatabase from '../services/database/requests';

export default async function guildMemberAdd(
  bot: Bot,
  member: GuildMember
) {
  const invitesCurrent = await member.guild.invites.fetch();
  const invitesOld = bot.invites.get(member.guild.id);
  const invite = invitesCurrent.find(i => i.uses > invitesOld.get(i.code));
  const inviter = await bot.users.fetch(invite.inviter.id);

  await RequestsDatabase.updateInviter(member.guild.id, inviter.id);
  await RequestsDatabase.updateInvited(member.guild.id, member.id, inviter.id);
}
