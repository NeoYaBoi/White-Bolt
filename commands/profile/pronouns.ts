import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const profileSchema = require("../../schemas/profileSchema");

export default {
  name: "pronouns",
  category: "Profile",
  description: "Changes your pronouns on your profile",
  expectedArgs: "<pronouns>",
  minArgs: 1,
  slash: "both",
  expectedArgsTypes: ["STRING"],
  callback: async ({ interaction, message, args, user }) => {
    let pronouns = message
      ? args[0]!
      : interaction.options.getString("pronouns")!;
    if (!pronouns.includes("/")) {
      return {
        custom: true,
        content: "These are not valid pronouns.",
        ephemeral: true,
      };
    }
    let pronounArgs = pronouns.split("/");
    if (pronounArgs[0].length >= 5 || pronounArgs[1].length >= 5)
      return {
        custom: true,
        content: "Your pronouns are to long.",
        ephemeral: true,
      };
    if (pronounArgs[2])
      return {
        custom: true,
        content: "Your pronouns are to long.",
        ephemeral: true,
      };
    await profileSchema.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        pronouns: pronouns,
      },
      {
        upsert: true,
      }
    );
    return `Your pronouns have now been set to ${pronouns}`;
  },
} as ICommand;
