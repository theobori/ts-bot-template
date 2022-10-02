import {
  ApplicationCommandOption,
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js';

import { Bot } from '../../bot';
import { ICommand } from '../../interfaces/command';

import dbRequests from '../../services/database/requests';

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

  async run(
    _bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    _args: Array<CommandInteractionOption>
  ) {
    const topInvites = dbRequests.getTopInvites(message.guildId, 20);
    const documents = await topInvites.toArray();

    if (documents.length === 0) {
      console.log("empty")
    }

    const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('previous')
					.setStyle(ButtonStyle.Secondary)
          .setEmoji('⬅️'),
        new ButtonBuilder()
					.setCustomId('next')
					.setStyle(ButtonStyle.Secondary)
          .setEmoji('➡️'),
			);

      const embed = new EmbedBuilder()
      .setTitle('Top inviters')
      .setColor(0x000000)
      .addFields(
        { name: 'A', value: 'a' },
        { name: 'B', value: 'b' }
      );

    message.reply(
      {
        embeds: [ embed ],
        components: [ row ]
      }
    );
  }

};
