import { Guild } from 'discord.js';
import { Bot } from '../bot';

export default function guildDelete(
  bot: Bot,
  guild: Guild
) {
  bot.invites.delete(guild.id);
}
