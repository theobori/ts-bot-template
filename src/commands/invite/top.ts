import {
  ApplicationCommandOption,
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  EmbedBuilder,
  Message
} from 'discord.js';

import { Bot } from '../../bot';
import ICommand from '../../interfaces/command';

import dbRequests from '../../services/database/requests';

import AbstractPageComponent from '../../services/components/page';

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
      // if (i.user.id !== this.messag) {
      //   return;
      // }

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

  async run(
    _bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    _args: Array<CommandInteractionOption>
  ) {
    const topInvites = dbRequests.getTopInvites(message.guildId, 20);
    const documents = await topInvites.toArray();
    
    if (documents.length === 0) {
      console.log('empty')
    }

    // new AbstractPageComponent(5)
    //   .setMessage(message as Message<boolean>)
    //   .addContent([
    //     "1","2","3","4","5","6","7","8","9","10"
    //   ])
    //   .reply();
    
      const component = new InvitePageComponent()
        .setMaxLines(5)
        .setMessage(message as Message<boolean>)
        .addContent([
          {
            inviter: '1',
            invites: 12
          },
          {
            inviter: '2',
            invites: 12
          },
          {
            inviter: '3',
            invites: 12
          },
          {
            inviter: '4',
            invites: 12
          },
          {
            inviter: '5',
            invites: 12
          },
          {
            inviter: '6',
            invites: 12
          },
          {
            inviter: '7',
            invites: 12
          }
        ])
      
      await component.collect();
      await component.reply();

    

    // const author = message.member as GuildMember;
  }

};
