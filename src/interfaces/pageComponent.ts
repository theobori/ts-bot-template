import { EmbedBuilder } from "discord.js";

export default interface IPageComponent {
  collect: () => void;
  reply: () => void;
  createEmbed: () => EmbedBuilder;
}
  