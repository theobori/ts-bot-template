import { EmbedBuilder } from "discord.js";

enum ErrorMessage {
  WRONG_ERROR_MSG = '⚠️ Something went wrong',
  NOT_FOUND_ERROR_MSG = '☁️ Nothing has not been found'
}

class ErrorEmbed {
  static wrong(): EmbedBuilder {
    return new EmbedBuilder()
    .setDescription(ErrorMessage.WRONG_ERROR_MSG)
    .setColor(0xf2bac9);
  }

  static notFound(): EmbedBuilder {
    return new EmbedBuilder()
    .setDescription(ErrorMessage.NOT_FOUND_ERROR_MSG)
    .setColor(0xbaf2bb);
  }
}

export { ErrorMessage, ErrorEmbed };
