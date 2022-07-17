import { ICommand } from "wokcommands";
import { currency } from "../../config.json";
const userSchema = require("../../schemas/userSchema");

export default {
  name: "give",
  aliases: ["give", "g"],
  category: "Economy",
  description: "Gives money to a specified user",
  expectedArgs: "<amount> <user>",
  minArgs: 2,
  slash: "both",
  guildOnly: true,
  expectedArgsTypes: ["NUMBER", "USER"],
  callback: async ({ interaction, message, args, member }) => {
    let user = message
      ? message.mentions.members?.first()?.user
      : interaction.options.getUser("user");
    let amount = message
      ? parseFloat(args[0])!
      : interaction.options.getNumber("amount")!;
    if (isNaN(amount))
      return {
        custom: true,
        content: "You must specify a valid amount.",
        ephemeral: true,
      };
    if (member.id == user?.id)
      return {
        custom: true,
        content: "You cannot give money to yourself.",
        ephemeral: true,
      };
    const senderResult = await userSchema.findOne({ _id: member.id });
    const receiverResult = await userSchema.findOne({ _id: user?.id });
    let toGive = amount;
    let sedToSet;
    let recToSet;
    //checking if the sender is in the database
    if (!senderResult || !senderResult.money) {
      if (amount >= 1000)
        return {
          custom: true,
          content: "You do not have enough money",
          ephemeral: true,
        };
      sedToSet = 1000 - amount;
    } else {
      if (amount >= senderResult.money)
        return {
          custom: true,
          content: "You do not have enough money",
          ephemeral: true,
        };
      sedToSet = senderResult.money - amount;
    }
    //checking if receiver is in database or not
    if (!receiverResult || !receiverResult.money) {
      recToSet = 1000 + amount;
    } else {
      recToSet = receiverResult.money + amount;
    }
    //setting sender money amount
    await userSchema.findOneAndUpdate(
      {
        _id: member.id,
      },
      {
        money: sedToSet,
      },
      {
        upsert: true,
      }
    );
    //setting receiver money amount
    await userSchema.findOneAndUpdate(
      {
        _id: user?.id,
      },
      {
        money: recToSet,
      },
      {
        upsert: true,
      }
    );
    //returning content
    return `You gave ${amount} ${currency} to ${user?.username}`;
  },
} as ICommand;
