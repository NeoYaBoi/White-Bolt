import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const userSchema = require("../../schemas/userSchema");

export default {
  name: "add",
  category: "Owner",
  description: "Adds money to a user",
  expectedArgs: "<amount> <user>",
  minArgs: 2,
  slash: "both",
  ownerOnly: true,
  hidden: true,
  expectedArgsTypes: ["NUMBER", "USER"],
  callback: async ({ interaction, message, args }) => {
    if (message && !args[0].startsWith("<@"))
      return {
        custom: true,
        content: "Please specify someone to add money to.",
        ephemeral: true,
      };

    let user = message
      ? message.mentions.members?.first()?.user!
      : interaction.options.getUser("user")!;
    let amount = message
      ? parseFloat(args[0])!
      : interaction.options.getNumber("amount")!;

    if (message) {
      if (isNaN(amount))
        return {
          custom: true,
          content: "You must specify a valid amount of money to add.",
          ephemeral: true,
        };
    }
    const userResult = await userSchema.findOne({ _id: user.id });
    let add;
    if (!userResult || !userResult.money) {
      add = 1000;
    } else {
      add = userResult.money;
    }
    let amountToSet = add + amount;
    await userSchema.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        money: amountToSet,
      },
      {
        upsert: true,
      }
    );
    const embed = new MessageEmbed()
      .setAuthor(`${user.username} | Money Added`)
      .addFields({ name: "Amount Added", value: `${amount}` }, {name: "New Amount", value: `${amountToSet}`})
      .setColor("WHITE");
    return embed
  },
} as ICommand;
