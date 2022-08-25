import {
    ApplicationCommandOption,
    CacheType,
    CommandInteraction,
    CommandInteractionOption,
    GuildMember,
    EmbedBuilder,
    Message, 
    PermissionsBitField
  } from 'discord.js';
  
import { Bot } from '../../bot';
import { ICommand } from '../../interfaces/command';
import { ErrorEmbed } from '../../utils/msg';

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

  async run(
    _bot: Bot,
    message: Message<boolean> | CommandInteraction<CacheType>,
    args: Array<CommandInteractionOption>
  ) {
    let [ target, reason ] = args;
    const member = target.member as GuildMember;
    const author = message.member as GuildMember;
    let reasonStr = 'No reason';

    // Check permissions
    if (author.permissions.has(PermissionsBitField.Flags.BanMembers) === false) {
      message.reply(
        { embeds: [ErrorEmbed.wrong()] }
      );
      return;
    }

    // Check for the optional reason
    if (reason) {
      reasonStr = reason.value.toString();
    }

    // Try to ban the member
    try {
      await member.ban();
    } catch (error) {
      message.reply(
        { embeds: [ErrorEmbed.wrong()] }
      );
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('Kick')
      .setColor(0xbaf2bb)
      .addFields(
        { name: 'Member', value: member.toString() },
        { name: 'Reason', value: reasonStr }
      );

    message.reply(
      { embeds: [embed] }
    );
  }
};
  