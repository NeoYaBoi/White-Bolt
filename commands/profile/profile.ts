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
  guildOnly: true,
  expectedArgsTypes: ["USER"],
  callback: async ({ interaction, message, user, args }) => {
    let use;
    console.log(interaction.options.data.length)
    if (message && args[0] && message.mentions.users?.first()) {
      use = message.mentions.users.first()!;
    } else if (interaction && interaction.options.data.length == 1) {
      use = interaction.options.getUser("user");
    } else {
      use = user;
    }
    let profile = await profileSchema.findOne({ _id: use?.id });
    if (profile && profile.visible == "false" && user?.id != profile._id) {
      return {
        custom: true,
        content: "This user has disabled there profile visibility.",
        ephemeral: true,
      };
    }
    const embed = new MessageEmbed();
    if (use) {
      embed.setAuthor(
        use?.username,
        use.displayAvatarURL({ format: "jpg", dynamic: true })
      );
    }
    embed
    .setDescription(`This is *${use?.tag}'s* White Bolt profile`)
    .setColor("WHITE")
    .addFields([
      {
        name: "\u200b",
        value: "**Discord**"
      },
      {
        name: "📌 Ping",
        value: `<@${use?.id}>`,
        inline: true
      },
      {
        name: "📛 Nickname",
        value: "``Disabled``",
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
        name: "😐 Name",
        value: profile ? profile.name : "null",
        inline: true,
      },
      {
        name: "🧓 Age",
        value: profile ? profile.age + " years" : "null",
        inline: true
      },
      {
        name: "🏳️‍🌈 Sexuality",
        value: profile ? profile.sexuality : "null",
        inline: true
      },
      {
        name: "🧬 Gender",
        value: profile ? profile.gender : "null",
        inline: true
      },
      {
        name: "<:bcccremovebgpreview:999267573755559946> Status",
        value: profile ? profile.status : "null",
        inline: true
      },
      {
        name: "💷 Pronouns",
        value: profile ? profile.pronouns : "null",
        inline: true
      }
    ]);
    if(profile && profile.banner) {
      embed.setImage(profile.banner)
    }
    if(profile && profile.thumbnail) {
      embed.setThumbnail(profile.thumbnail)
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
