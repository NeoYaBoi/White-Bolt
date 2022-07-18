import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const profileSchema = require("../../schemas/profileSchema");
const userSchema = require("../../schemas/userSchema");

export default {
  name: "profile",
  names: ["profile", "pf"],
  category: "Profile",
  description: "Gets a users profile.",
  expectedArgs: "<user>",
  minArgs: 0,
  maxArgs: 1,
  slash: "both",
  testOnly: true,
  guildOnly: true,
  expectedArgsTypes: ["USER"],
  callback: async ({ interaction, message, member, args }) => {
    let use;
    if (message && args[0] && message.mentions.members?.first()) {
      use = message.mentions.members.first()!;
    } else if (interaction && interaction.options.data.length == 1) {
      interaction.options.getMember("user");
    } else {
      use = member;
    }
    let profile = await profileSchema.findOne({ _id: use?.id });
    if (profile && profile.visible == "false" && member?.id != profile._id) {
      return {
        custom: true,
        content: "This user has disabled there profile visibility.",
        ephemeral: true,
      };
    }
    const embed = new MessageEmbed();
    if (use) {
      embed.setAuthor(
        use?.displayName,
        use.displayAvatarURL({ format: "jpg", dynamic: true })
      );
    }
    embed
    .setDescription(`This is ${use?.displayName}'s White Bolt profile`)
    .setColor("WHITE")
    .addFields([
      {
        name: "\u200b",
        value: "**Discord**"
      },
      {
        name: "<:3815squareping:998516276446117948> Ping",
        value: `<@${member.id}>`,
        inline: true
      },
      {
        name: "📛 Nickname",
        value: use?.nickname || "N/A",
        inline: true,
      },
      {
        name: "🆔 ID",
        value: `${use?.id}`,
        inline: true
      },
      {
        name: "\u200b",
        value: "**Custom**"
      },
      {
        name: "😐 Preferred Name",
        value: `Name Here`,
        inline: true,
      },
      {
        name: "🧓 Age",
        value: profile ? profile.age + " years" : "N/A",
        inline: true
      },
      {
        name: "<:heto:998447620034928670> Sexuality",
        value: profile ? profile.sexuality : "N/A",
        inline: true
      },
    ]);
    if(profile && profile.banner) {
      embed.setImage(profile.banner)
    }
    if(profile && profile.embedColor) {
      if(profile.embedColor == "BLUE") {
        embed.setColor("BLUE")
      } else if(profile.embedColor == "GREEN") {
        embed.setColor("GREEN")
      } else if(profile.embedColor == "PURPLE") {
        embed.setColor("PURPLE")
      } else if(profile.embedColor == "DARK_VIVID_PINK") {
        embed.setColor("DARK_VIVID_PINK")
      } else if(profile.embedColor == "BLACK") {
        embed.setColor("DARK_BUT_NOT_BLACK")
      } else if(profile.embedColor == "RED") {
        embed.setColor("RED")
      } else if(profile.embedColor == "YELLOW") {
        embed.setColor("YELLOW")
      } else if(profile.embedColor == "RANDOM") {
        embed.setColor("RANDOM")
      }
    }
    return embed;
  },
} as ICommand;
