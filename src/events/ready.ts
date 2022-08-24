import { Bot } from '../bot';
import { Logs } from '../services/logs';

export default async function ready(bot: Bot) {
  const slashCommands = [];

  for (const [name, command] of bot.commands) {
    slashCommands.push(
      {
        name,
        description: command.description,
        options: command.options,
        type: 1
      }
    );
  }

  const botName = bot.user.username + '#' + bot.user.discriminator
  Logs.info(botName + ' is ready')

  await bot.application?.commands.set(slashCommands);
}
