import {
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';
import IPageComponent from '../../interfaces/pageComponent';

import Page from '../../utils/page';

class AbstractPageComponent<T> extends Page<T> implements IPageComponent{
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

  collect() {

  }

  async reply() {

  }
}

export default AbstractPageComponent;
