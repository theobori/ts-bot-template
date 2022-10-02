import {
  ApplicationCommandOption,
  CommandInteraction,
  CommandInteractionOption,
  Message 
} from 'discord.js';

import { Bot } from '../bot';
import { hasImplemented } from '../utils/implemented';

export default interface ICommand {
  name: String,
  category: String,
  description: String,
  args?: string,
  aliases?: Array<string>,
  options: ApplicationCommandOption[],
  run: (
    bot: Bot,
    message: Message | CommandInteraction,
    args: Array<CommandInteractionOption>
  ) => void;
}

function isICommand(obj: any): boolean {
  return hasImplemented(
    obj,
    'name',
    'category',
    'description',
    'options',
    'run'
  )
}

export { isICommand };
