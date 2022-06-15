import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from "../../config.json";
const userSchema = require("../../schemas/userSchema");

export default {
  name: "bet",
  category: "Economy",
  description: "Bets money",
  expectedArgs: "<amount>",
  minArgs: 1,
  slash: "both",
  expectedArgsTypes: ["NUMBER"],
  callback: async ({
    interaction,
    message,
    member,
    args,
    prefix,
    guild,
    instance,
  }) => {
    let amount = message ? args[0]! : interaction.options.getNumber("amount")!;
    let amountToSet;
    let wOrL;
    let dILose;
    let embed = new MessageEmbed();
    const coinFlp = Math.floor(Math.random() * 2) + 1;
    const userResult = await userSchema.findOne({ _id: member.id });
    if(interaction) prefix = "/"
    if (!userResult || !userResult.money)
      return {
        custom: true,
        content: `You do not have any money to bet. Please use \`${prefix}balance\` to check your amount.`,
        ephemeral: true,
      };
    if (message) {
      if (isNaN(parseFloat(args[0]))) {
        return {
          custom: true,
          content: "You must specify a valid number",
          ephemeral: true,
        };
      }
    }
    if (coinFlp == 1) {
      //LOSS
      amountToSet = userResult.money - parseFloat(args[0]);
      wOrL = "LOSE";
      dILose = "You just lost";
      embed
        .setColor("DARK_RED")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/985350444626882590/986187072329121872/gam_lose.jpg"
        );
    } else if (coinFlp == 2) {
      //WIN
      amountToSet = userResult.money + parseFloat(args[0]);
      wOrL = "WIN";
      dILose = "You just won"
      embed
        .setColor("GREEN")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/985350444626882590/986186651053195284/gam_win.jpg"
        );
    } else {
      return instance.messageHandler.get(guild, "EXCEPTION");
    }
    if (userResult.money + 1 <= amount)
      return {
        custom: true,
        content: "You do not have enough money",
        ephemeral: true,
      };
    await userSchema.findOneAndUpdate(
      {
        _id: member.id,
      },
      {
        money: amountToSet,
      },
      {
        upsert: true,
      }
    );
    embed
      .setTitle(`Bet | ${wOrL}`)
      .setDescription(`${dILose} **${amount} ${currency}**`)
      .setFooter(`New Balance: ${amountToSet} ${currency}`)
      .setFooter(instance.messageHandler.get(guild, "IMAGE-TEST"));
    return embed;
  },
} as ICommand;