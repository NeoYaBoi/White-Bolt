import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import DJS from "discord.js";

export default {
  category: "Utility",
  description: "Sends a custom embed",
  expectedArgs: "<title> <embed>",
  minArgs: 2,
  slash: "both",
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "title",
      description: "The title you would like in the embed.",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
    },
    {
      name: "colour",
      description: "The colour you would like in the embed.",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {
          name: "RED",
          value: "RED",
        },
        {
          name: "GREEN",
          value: "GREEN",
        },
        {
          name: "BLUE",
          value: "BLUE",
        },
        {
          name: "WHITE",
          value: "WHITE",
        },
        {
          name: "BLACK",
          value: "BLACK",
        },
        {
          name: "YELLOW",
          value: "YELLOW",
        },
        {
          name: "GOLD",
          value: "GOLD",
        },
        {
          name: "PINK",
          value: "PINK",
        },
        {
          name: "PURPLE",
          value: "PURPLE",
        },
        {
          name: "RANDOM",
          value: "RANDOM",
        },
      ],
    },
    {
      name: "content",
      description: "The content you would like in the embed.",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
    },
  ],

  callback: ({ interaction, message, args, prefix }) => {
    if (interaction) {
      let content = interaction.options.getString("content")!;
      let title = interaction.options.getString("title")!;
      let color = interaction.options.getString("colour")!;

      const embed = new MessageEmbed().setTitle(title).setDescription(content);
      if (color == "RED") {
        embed.setColor("RED");
      } else if (color == "GREEN") {
        embed.setColor("GREEN");
      } else if (color == "BLUE") {
        embed.setColor("BLUE");
      } else if (color == "WHITE") {
        embed.setColor("WHITE");
      } else if (color == "BlACK") {
        embed.setColor("DARK_BUT_NOT_BLACK");
      } else if (color == "YELLOW") {
        embed.setColor("YELLOW");
      } else if (color == "GOLD") {
        embed.setColor("GOLD");
      } else if (color == "PINK") {
        embed.setColor("DARK_VIVID_PINK");
      } else if (color == "PURPLE") {
        embed.setColor("PURPLE");
      } else if (color == "RANDOM") {
        embed.setColor("RANDOM");
      }
      return embed;
    } else {
      const cheese = message.content.replace(`${prefix}embed ${args[0]}`, ``);
      const embed = new MessageEmbed()
        .setTitle(args[0])
        .setColor("WHITE")
        .setDescription(cheese);
      message.channel.send({ embeds: [embed] });
    }
  },
} as ICommand;
