import {
  ApplicationCommandOption,
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message 
} from 'discord.js';

import { Bot } from '../../bot';
import { ICommand } from '../../interfaces/command';

export default class implements ICommand {
  name: String;
  category: String;
  description: String;
  options: ApplicationCommandOption[];

  constructor() {
    this.name = 'top';
    this.category = 'invite';
    this.description = 'Show top 20 inviters';
    this.options = [];
  }

  run(
    _bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    _args: Array<CommandInteractionOption>
  ) {
    message.reply(
      {
        content: 'top'
      }
    );
  }

};
