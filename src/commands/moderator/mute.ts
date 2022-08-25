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
  name = 'mute';
  category = 'moderator';
  description = 'Mute a guild member';
  options: ApplicationCommandOption[];

  constructor() {

  }

  run(
    _bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    _args: Array<CommandInteractionOption>
  ) {
    message.reply(
      {
        content: 'mute'
      }
    );
  }

};
  