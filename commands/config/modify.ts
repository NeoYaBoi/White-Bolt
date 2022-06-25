import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const serverSchema = require("../../schemas/serverSchema");

export default {
  name: "modify",
  names: ["modify", "settings"],
  category: "Configuration",
  description:
    "Enabled you to change settings in the bot for your server (SOC)",
  expectedArgs: "<change> <on/off>",
  minArgs: 2,
  slash: "both",
  permissions: ["ADMINISTRATOR"],
  guildOnly: true,
  options: [
    {
      name: "setting",
      description: "Change a setting for your server.",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {
          name: "Anime",
          value: "ANIME",
        },
        {
          name: "NSFW",
          value: "NSFW",
        },
        {
          name: "Welcome",
          value: "WELCOME",
        },
        {
          name: "Confessions",
          value: "CONFESSIONS",
        },
      ],
    },
    {
      name: "toggle",
      description: "Turn on or off",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {
          name: "Enable",
          value: "true",
        },
        {
          name: "Disable",
          value: "false",
        },
      ],
    },
  ],
  callback: async ({ interaction, message, guild, prefix }) => {
    if (message)
      return {
        custom: true,
        content: "This is a slash only command",
        ephemeral: true,
      };
    let setting = interaction.options.getString("setting");
    let toggle = interaction.options.getString("toggle");
    const serverResult = await serverSchema.findOne({ _id: guild?.id });
    let content;

    if (setting == "ANIME") {
      await serverSchema.findOneAndUpdate(
        {
          _id: guild?.id,
        },
        {
          animeToggle: toggle,
        },
        {
          upsert: true,
        }
      );
      content = `The anime toggle is now set to ${toggle}`;
    } else if (setting == "NSFW") {
      await serverSchema.findOneAndUpdate(
        {
          _id: guild?.id,
        },
        {
          nsfwToggle: toggle,
        },
        {
          upsert: true,
        }
      );
      content = `The NSFW toggle is now set to ${toggle}`;
    } else if (setting == "WELCOME") {
      await serverSchema.findOneAndUpdate(
        {
          _id: guild?.id,
        },
        {
          welcomeToggle: toggle,
        },
        {
          upsert: true,
        }
      );
      content = `The welcome toggle is now set to ${toggle}`;
    } else if (setting == "CONFESSIONS") {
      await serverSchema.findOneAndUpdate(
        {
          _id: guild?.id
        },
        {
          confessionToggle: toggle
        }, 
        {
          upsert: true
        });
    }
    return content;
  },
} as ICommand;
