import {
  CommandInteractionOption,
  Interaction 
} from 'discord.js';

import { Bot } from '../bot';

export default function interactionCreate(
  bot: Bot,
  interaction: Interaction
) {
  const args: Array<CommandInteractionOption> = [];

  if (!interaction.isCommand()) {
    return;
  }

  for (const v of interaction.options.data) {
    args.push(v)
  }

  const command = bot.commands.get(interaction.commandName);

  if (command === undefined) {
    return;
  }

  command.run(bot, interaction, args);
}
