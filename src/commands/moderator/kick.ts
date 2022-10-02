import {
    ApplicationCommandOption,
    ApplicationCommandOptionType,
    CacheType,
    CommandInteraction,
    CommandInteractionOption,
    GuildMember,
    Message,
    EmbedBuilder,
    PermissionsBitField
  } from 'discord.js';
  
import { Bot } from '../../bot';
import ICommand from '../../interfaces/command';
import { ErrorEmbed } from '../../utils/msg';

export default class implements ICommand {
  name = 'kick';
  category = 'moderator';
  description = 'Kick a guild member';
  options: ApplicationCommandOption[] = [
    {
      name: 'member',
      type: ApplicationCommandOptionType.User,
      required: true,
      description: 'The member to kick',
    },
    {
      name: 'reason',
      type: ApplicationCommandOptionType.String,
      required: false,
      description: 'An optional reason',
    }
  ];

  constructor() {

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
    if (author.permissions.has(PermissionsBitField.Flags.KickMembers) === false) {
      message.reply(
        { embeds: [ErrorEmbed.wrong()] }
      );
      return;
    }

    // Check for the optional reason
    if (reason) {
      reasonStr = reason.value.toString();
    }

    // Try to kick the member
    try {
      await member.kick();
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

    await message.reply(
      { embeds: [embed] }
    );
  }
};
  