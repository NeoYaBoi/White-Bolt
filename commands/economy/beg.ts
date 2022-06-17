import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from '../../config.json'
const userSchema = require("../../schemas/userSchema");
const begOp = [
  "A goldfish appeared and gave you ",
  "Fine, here is ",
  "God answered your wishes and gave you ",
  "William Worral appeared in front of you and gave you ",
  "Black Bolt came back to life and gave you ",
  "You looked at your feet and found "
];

export default {
  name: "beg",
  category: "Economy",
  description: "Begs for free coins.",
  slash: "both",
  guildOnly: true,
  callback: async ({ member, instance, guild }) => {
    let ranBeg = Math.floor(Math.random() * begOp.length);
    const userResult = await userSchema.findOne({ _id: member.id });
    const amount = Math.floor(Math.random() * 10000) + 1;
    let toSet;
    if (!userResult || !userResult.money) {
      toSet = amount + 1000;
    } else if (userResult.money >= 10000) {
      return {
        custom: true,
        content: "You already have enough",
        ephemeral: true,
      };
    } else {
      toSet = userResult.money + amount;
    }
    await userSchema.findOneAndUpdate(
      {
        _id: member.id,
      },
      {
        money: toSet,
      },
      {
        upsert: true,
      }
    );
    const embed = new MessageEmbed()
      .setAuthor(`${member.displayName} | Beg`)
      .setDescription(`${begOp[ranBeg]} **${amount} ${currency}**`)
      .setColor("WHITE")
      .setThumbnail("https://cdn.discordapp.com/attachments/985350444626882590/986823262623379507/beg_man.jpg")
      .setFooter(instance.messageHandler.get(guild, "IMAGE-TEST"))
    return embed;

  },
} as ICommand;