import {
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

type InviteContent = {
  inviter: string;
  invites: number
};

class InvitePageComponent 
extends AbstractPageComponent<InviteContent> {
  constructor() {
    super();
  }

  private inviteContentToString(
    currentContent: InviteContent[],
    func: (content: InviteContent) => string
  ): string {
    return currentContent.map(content => {
      return func(content);
    }).join('\n');
  }

  private createEmbed(): EmbedBuilder {
    const currentContent = this.getCurrentContent();
    const names = this.inviteContentToString(
      currentContent,
      (content) => content.inviter
    );
    const invites = this.inviteContentToString(
      currentContent,
      (content) => content.invites.toString()
    );

    return new EmbedBuilder()
      .setTitle('Top inviters')
      .setColor(0x000000)
      .addFields(
        { name: 'Name', value: names, inline: true },
        { name: 'Invites', value: invites, inline: true }
      )
      .setFooter(
        {
          text: 'Page ' + this.pageNumber + ' / ' + this.pageMax
        }
      );
  }

  async collect() {
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
      await i.editReply(
        {
          embeds: [ this.createEmbed() ],
          components: [ this.createButtons() ]
        }
      ); 

    });
  }

  async reply() {
    await this.message.reply(
      {
        embeds: [ this.createEmbed() ],
        components: [ this.createButtons() ]
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
