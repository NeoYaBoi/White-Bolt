import { ICommand } from "wokcommands";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const welcomeSchema = require("../../schemas/welcomeSchema");

export default {
  name: "welcome",
  category: "Configuration",
  description: "Changes/sets the current welcome channel in this guild. (SOC)",
  expectedArgs: "<channel> <embed-title> <embed-description>",
  minArgs: 3,
  slash: "both",
  guildOnly: true,
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "channel",
      description:
        "The channel you would like your welcome message to be sent to.",
      required: true,
      type: ApplicationCommandOptionTypes.CHANNEL,
    },
    {
      name: "embed-title",
      description:
        "The title of the embed that will be sent when someone joins.",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
    },
    {
      name: "embed-description",
      description:
        "Description. ({@} = user ping, {name} = username)",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
    },
  ],
  callback: async ({ interaction, message, guild, member }) => {
    if (message)
      return {
        custom: true,
        content: "This is a slash only command",
        ephemeral: true,
      };
    let channel = interaction.options.getChannel("channel")!;
    let title = interaction.options.getString("embed-title")!;
    let desc = interaction.options.getString("embed-description")!;
    if (channel?.type != "GUILD_TEXT")
      return {
        custom: true,
        content: "This is not a text channel.",
        ephemeral: true,
      };
    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild?.id,
      },
      {
        welcomeChannel: channel?.id,
        embedTitle: title,
        embedDesc: desc,
      },
      {
        upsert: true,
      }
    );
    return `The welcome channel has been set to ${channel?.name}.`;
  },
} as ICommand;