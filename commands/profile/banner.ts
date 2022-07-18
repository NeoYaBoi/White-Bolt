import { ICommand } from "wokcommands";
import { BaseCommandInteraction, MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const profileSchema = require("../../schemas/profileSchema");

export default {
  name: "banner",
  category: "Profile",
  description: "Changes the banner on your profile.",
  expectedArgs: "<banner>",
  minArgs: 1,
  slash: "both",
  expectedArgsTypes: ["STRING"],
  callback: async ({ interaction, message, args, user }) => {
    let banner = message ? args[0] : interaction.options.getString("banner")!;
    if(!banner.startsWith('http://') && !banner.startsWith('https://')) {
        return {
            custom: true,
            content: "This is not a valid banner",
            ephemeral: true,
          };
    }
    await profileSchema.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        banner: banner,
      },
      {
        upsert: true,
      }
    );
    let embed = new MessageEmbed()
      .setTitle("Banner")
      .setDescription(`Your new banner has been set to`)
      .setColor("WHITE")
      .setImage(banner);
      return embed
    
  },
} as ICommand;
