import {
    ApplicationCommandOption,
    ApplicationCommandOptionType,
    CacheType,
    CommandInteraction,
    CommandInteractionOption,
    Message 
  } from 'discord.js';
  
import { Bot } from '../../bot';
import ICommand from '../../interfaces/command';

import RequestsDatabase from '../../services/database/requests';

export default class implements ICommand {
  name = 'clear';
  category = 'moderator';
  description = 'Clear a certain amount of messages in this channel';
  options: ApplicationCommandOption[] = [
    {
      name: 'amount',
      type: ApplicationCommandOptionType.Number,
      required: false,
      description: 'Amount of messages to delete',
    }
  ];

  constructor() {

  }

  async run(
    _bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    _args: Array<CommandInteractionOption>
  ) {
    console.log(message.guildId, message.member.user.id);
  
    RequestsDatabase.updateInviter(message.guildId, message.member.user.id)
  
    await message.reply(
      {
        content: 'clear'
      }
    );
  }

};
  