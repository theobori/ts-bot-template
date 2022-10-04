import {
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessagePayload,
  WebhookEditMessageOptions
} from 'discord.js';
import IPageComponent from '../../interfaces/pageComponent';

import Page from '../../utils/page';

abstract class AbstractPageComponent<T> extends Page<T> implements IPageComponent {
  protected message: Message<boolean>;

  protected previousId: string = 'previous';
  protected nextId: string = 'next';

  constructor(maxLines: number = 10) {
    super(maxLines);
  }

  setMessage(message: Message<boolean>): this {
    this.message = message;
    
    return this;
  }

  protected createButtons(): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(this.previousId)
					.setStyle(
            this.hasPrevious()
              ? ButtonStyle.Secondary
              : ButtonStyle.Danger
          )
          .setEmoji('⬅️'),
        new ButtonBuilder()
					.setCustomId(this.nextId)
					.setStyle(
            this.hasNext()
              ? ButtonStyle.Secondary
              : ButtonStyle.Danger
          )
          .setEmoji('➡️'),
			);
  }

  createEmbed(): EmbedBuilder {
    return new EmbedBuilder();
  }

  private createOptions()
  : string | MessagePayload | WebhookEditMessageOptions {
    return {
      embeds: [ this.createEmbed() ],
      components: [ this.createButtons() ]
    };
  }

  collect() {
    const collector = this.message.channel.createMessageComponentCollector({
      time: 1000 * 60
    });

    collector.on('collect', async i => {
      if (i.user.id !== this.message.member.id) {
        return;
      }

      switch (i.customId) {
        case this.previousId:
          this.previous()
          break;
        case this.nextId:
          this.next();
          break;
        default:
          break;
      }

      await i.deferUpdate();
      await i.editReply(this.createOptions()); 

    });
  }

  async reply() {
    await this.message.reply(this.createOptions());
  }
}

export default AbstractPageComponent;
