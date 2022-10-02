import {
  Guild,
  Collection
} from 'discord.js';
  
import { Bot } from '../bot';

export default function guildCreate(
  bot: Bot,
  guild: Guild
) {
  guild.invites.fetch().then (invites => {
    bot.invites.set(guild.id, new Collection(invites.map((invite) => [invite.code, invite.uses])));
  })
}
