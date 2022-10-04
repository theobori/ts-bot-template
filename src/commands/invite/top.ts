import {
  APIEmbedField,
  ApplicationCommandOption,
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  EmbedBuilder,
  Message,
} from 'discord.js';

import {
  Document,
  WithId,
} from 'mongodb';

import { Bot } from '../../bot';
import ICommand from '../../interfaces/command';
import dbRequests from '../../services/database/requests';
import AbstractPageComponent from '../../services/components/page';
import ErrorEmbed from '../../utils/msg';
import capitalize from '../../utils/capitalize';

type InviteContent = {
  inviter: string;
  invites: number
};

class InvitePageComponent 
extends AbstractPageComponent<InviteContent> {
  constructor() {
    super();
  }

  private autoCreateFields(): APIEmbedField[] {
    const currentContent = this.getCurrentContent();
    const model = currentContent[0] || [];

    return Object.keys(model).map(name => {
      return {
        name: capitalize(name),
        value: currentContent.map(content => { 
          return content[name].toString()
        }).join('\n'),
        inline: true
    };
    });
  }

  createEmbed(): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle('Top inviters')
      .setColor(0x000000)
      .addFields(this.autoCreateFields()
      )
      .setFooter(
        {
          text: 'Page ' + this.pageNumber + ' / ' + this.pageMax
        }
      );
  }
}

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

  private async formatDocuments(
    bot: Bot,
    documents: WithId<Document>[]
  ): Promise<InviteContent[]> {
    const ret: InviteContent[] = [];

    for (const invite of documents) {
      const user = await bot.users.fetch(invite.client_id);
      ret.push({
        inviter: '`' + user.username + '#' + user.discriminator + '`',
        invites: invite.invites
      });
    }

    return ret;
  }

  async run(
    bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    _args: Array<CommandInteractionOption>
  ) {
    const topInvites = dbRequests.getTopInvites(message.guildId, 20);
    const documents = await topInvites.toArray();

    if (documents.length == 0) {
      await message.reply({embeds: [ ErrorEmbed.notFound() ]});
      return;
    }

    const inviteContents = await this.formatDocuments(bot, documents);
    const component = new InvitePageComponent()
      .setMaxLines(10)
      .setMessage(message as Message<boolean>)
      .addContent(inviteContents);
    
    await component.collect();
    await component.reply();
  }
};
