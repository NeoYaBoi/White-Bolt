import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const serverSchema = require("../../schemas/serverSchema");
const anime = require("anime-images-api");
const API = new anime();

export default {
  name: "kill",
  aliases: ["kill", "murder"],
  category: "Fun",
  description: "Kills a specified user",
  expectedArgs: "<user>",
  minArgs: 1,
  slash: "both",
  options: [
    {
      name: "user",
      description: "A user to kill",
      required: true,
      type: ApplicationCommandOptionTypes.USER,
    },
  ],

  callback: async ({ interaction, message, guild, args, member }) => {
    const check = await serverSchema.findOne({
      _id: guild?.id,
    });
    let { image } = await API.sfw.kill();
    if (check && check.animeToggle == "false") {
      image =
        "https://cdn.discordapp.com/attachments/985350444626882590/985350958928257085/unknown.png";
    }
    let user = message ? args[0] : `<@${interaction.options.getUser('user')?.id}>`
    const embed = new MessageEmbed().setColor("WHITE").setThumbnail(image)
        .setDescription(`
            <@${member.id}>
            
            ***KILLS***
            
            ${user}`);
      return embed;
  },
} as ICommand;