import { ICommand } from "wokcommands";
import { GuildMember, MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";

export default {
  name: "kick",
  category: "Staff",
  description: "Kicks a specified user",
  expectedArgs: "<user> <reason>",
  minArgs: 1,
  slash: "both",
  permissions: ["KICK_MEMBERS"],
  requireRoles: true,
  guildOnly: true,
  options: [
    {
      name: "user",
      description: "Specify a user to kick",
      required: true,
      type: ApplicationCommandOptionTypes.USER,
    },
    {
      name: "reason",
      description: "The reason this user is getting kicked",
      required: false,
      type: ApplicationCommandOptionTypes.STRING,
    },
  ],
  callback: ({ interaction, message, member, args }) => {
    let user = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember("user") as GuildMember);
    if (!user) return "I cannot find this user";
    if (!user.kickable) {
      return {
        custom: true,
        content: "I cannot kick this user",
        ephemeral: true,
      };
    }
    args.shift();
    var realReason =
      (message ? args.join(" ") : interaction.options.getString("reason")) ||
      "No reason provided";

    user.kick(realReason);
    const embed = new MessageEmbed()
      .setAuthor(`${user.displayName} | Kicked`)
      .setDescription(`This user has been kicked with reason: *${realReason}*.`)
      .setColor("WHITE");
    return embed;
  },
} as ICommand;
