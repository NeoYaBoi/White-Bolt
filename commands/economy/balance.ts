import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from "../../config.json";
const userSchema = require("../../schemas/userSchema");

export default {
  name: "balance",
  aliases: ["balance", "bal"],
  category: "Economy",
  description: "Checks your balance",
  expectedArgs: "<user>",
  guildOnly: true,
  slash: "both",
  options: [
    {
      name: "user",
      description: "The user who's balance you would like to check",
      required: false,
      type: ApplicationCommandOptionTypes.USER,
    },
  ],

  callback: async ({ interaction, message, member }) => {
    let user = message
      ? message.mentions.members?.first()?.user! || member.user!
      : interaction.options.getUser("user")! || member.user!;
    let money;
    let xp;
    const userResult = await userSchema.findOne({ _id: user.id });
    if (!userResult || !userResult.xp) {
      xp = 0!;
    } else xp = userResult.xp;
    if (!userResult || !userResult.money) {
      await userSchema.findOneAndUpdate(
        {
          _id: user.id,
        },
        {
          money: 1000,
        },
        {
          upsert: true,
        }
      );
      money = 1000;
    } else money = userResult.money;
    let total = xp / 2 + money;
    const embed = new MessageEmbed()
      .setAuthor(
        `${user?.username} | Balance`,
        user.displayAvatarURL({ format: "jpg", dynamic: true })
      )
      .setDescription(
        `This user has **${money} ${currency}** and **${xp}xp** with a total worth of **${total} ${currency}**`
      )
      .setColor("WHITE");
    return embed;
  },
} as ICommand;