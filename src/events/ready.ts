import { Bot } from "../bot";

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

  await bot.application?.commands.set(slashCommands);
}
