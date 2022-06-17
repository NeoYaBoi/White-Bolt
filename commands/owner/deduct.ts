import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from '../../config.json'
const userSchema = require("../../schemas/userSchema");

export default {
  name: "deduct",
  aliases: ["deduct", "ded"],
  category: "Owner",
  description: "Deducts money from a user.",
  expectedArgs: "<amount> <user>",
  minArgs: 1,
  slash: "both",
  ownerOnly: true,
  hidden: true,
  options: [{
    name: "amount",
    description: "The amount you would like to deduct.",
    required: true,
    type: ApplicationCommandOptionTypes.NUMBER
  }, {
    name: "user",
    description: "The use you would like to deduct money from.",
    required: true,
    type: ApplicationCommandOptionTypes.USER
  }],
  callback: async ({ interaction, message, args }) => {
    if (message && (!args[1] || !message.mentions.members?.first())) {
      return {
        custom: true,
        content: "Please @ someone to deduct money from.",
        ephemeral: true,
      };
    }
    let user = message
      ? message.mentions.members?.first()?.user!
      : interaction.options.getUser("user")!;
    let amount = message
      ? parseFloat(args[0])!
      : interaction.options.getNumber("amount")!;
    if (message && isNaN(amount)) {
      return {
        custom: true,
        content: "Please specify a valid amount to add.",
        ephemeral: true,
      };
    }
    const userResult = await userSchema.findOne({ _id: user.id });
    let amtToSet;
    if (!userResult) {
      amtToSet = amount + 1000;
    } else {
      amtToSet = userResult.money - amount;
    }
    await userSchema.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        money: amtToSet,
      },
      {
        upsert: true,
      }
    );
    const embed = new MessageEmbed()
    .setAuthor(`${user.username} | Money Deducted`)
    .setColor("WHITE")
    .setDescription(`**${amount} ${currency}** were deducted from that user.`)
    return embed
  },
} as ICommand;
