import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import {
  ApplicationCommandOptionTypes,
  MembershipStates,
} from "discord.js/typings/enums";
const itemSchema = require("../../schemas/itemSchema");
const userSchema = require("../../schemas/userSchema");
const testing = require("../../testin")

export default {
  name: "buy",
  category: "Economy",
  description: "Buys specific items. (SOC)",
  expectedArgs: "<item>",
  minArgs: 1,
  slash: "both",
  testOnly: true,
  options: [
    {
      name: "item",
      description: "The item you would like to purchase",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {
          name: "test",
          value: "test",
        },
      ],
    },
  ],
  callback: async ({ interaction, message, member }) => {
    if (message) {
      return {
        custom: true,
        content: "This is a slash only command",
        ephemeral: true,
      };
    }
    let item = interaction.options.getString("item");
    const userResult = await userSchema.findOne({ _id: member.id });
    if (!userResult || !userResult.money) {
      return {
        custom: true,
        content: "You do not have enough money.",
        ephemeral: true,
      };
    }
    let embed = new MessageEmbed()
      .setAuthor(`${member.displayName} | Item`)
      .setColor("WHITE");
    
  },
} as ICommand;
