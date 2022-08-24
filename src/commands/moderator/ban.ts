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
      this.name = 'ban';
      this.category = 'moderator';
      this.description = 'Ban a guild member';
      this.options = [];
    }
  
    run(
      _bot: Bot,
      message: Message<boolean> | CommandInteraction<CacheType>,
      _args: Array<String | CommandInteractionOption>
    ) {
      message.reply(
        {
          content: 'ban'
        }
      );
    }
  
  };
  