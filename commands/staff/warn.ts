import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const userSchema = require("../../schemas/userSchema");
const warnSchema = require("../../schemas/warnSchema");

export default {
  name: "warn",
  category: "Staff",
  description: "Warns a specified user (SOC)",
  expectedArgs: "<user> <reason>",
  minArgs: 1,
  slash: "both",
  guildOnly: true,
  hidden: true,
  permissions: ["KICK_MEMBERS"],
  requireRoles: true,
  options: [
    {
      name: "user",
      description: "The user to warn",
      required: true,
      type: ApplicationCommandOptionTypes.USER,
    },
    {
      name: "reason",
      description: "The reason this user is receiving a warning",
      required: false,
      type: ApplicationCommandOptionTypes.STRING,
    },
  ],
  callback: async ({ interaction, message, guild }) => {
    if (message)
      return {
        custom: true,
        content: "This is a slash only command",
        ephemeral: true,
      };
    if (guild?.id != "804323987106168842" && guild?.id != "984917713224859699")
      return "Currently this command is unavailable";

    const user = interaction.options.getUser("user")!;
    const reason =
      interaction.options.getString("reason") || "No reason provided.";
    const ID = `$${Math.floor(Math.random() * (100000 - 10000000)) + 1}`;
    var currentDate = new Date();
    var time =
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear() +
      " @ " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    const userResult = await userSchema.findOne({ _id: user.id })!;
    let toSet;
    if (!userResult || !userResult.warns) {
      toSet = 1;
    } else toSet = userResult.warns + 1;
    await userSchema.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        warns: toSet,
      },
      {
        upsert: true,
      }
    );
    await warnSchema.findOneAndUpdate(
      {
        _id: ID,
      },
      {
        reason: reason,
        time: time,
        moderator: interaction.member?.user.username,
        warnNumber: toSet,
        user: user.id,
      },
      {
        upsert: true,
      }
    );
    const embed = new MessageEmbed()
      .setAuthor(`${user.username} | Warning ${toSet}`)
      .setColor("WHITE")
      .setFooter(`ID: ${ID}`)
      .addFields(
        {
          name: "Reason",
          value: reason,
        },
        {
          name: "User Warned",
          value: `<@${user?.id}>`,
        }
      );
    return embed;
  },
} as ICommand;
