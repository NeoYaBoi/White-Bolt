import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const serverSchema = require("../../schemas/serverSchema");
const anime = require("anime-images-api");
const API = new anime();

export default {
  name: "anime",
  category: "Fun",
  description: "Gives a anime gif of your choice (SLASH ONLY)",
  expectedArgs: "<anime verb>",
  minArgs: 1,
  slash: "both",
  guildOnly: true,
  cooldown: '5s',
  options: [
    {
      name: "verb",
      description: "A verb to fetch the gif about",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {
          name: "Hug",
          value: "HUG",
        },
        {
          name: "Kiss",
          value: "KISS",
        },
        {
          name: "Punch",
          value: "PUNCH",
        },
        {
          name: "Kill",
          value: "KILL",
        },
        {
          name: "Cuddle",
          value: "CUDDLE",
        },
        {
          name: "Hentai",
          value: "HENTAI",
        },
        {
          name: "Boobs",
          value: "BOOBS",
        },
        {
          name: "Lesbian",
          value: "LESBIAN",
        },
      ],
    },
    {
      name: "hidden",
      description: "Makes it so only you can see the gif.",
      type: ApplicationCommandOptionTypes.STRING,
      required: false,
      choices: [
        {
          name: "True",
          value: "YES",
        },
        {
          name: "False",
          value: "NO",
        },
      ],
    },
  ],

  callback: async ({ interaction, message, guild, channel, member }) => {
    if (message) return "This is a slash command only.";

    const check = await serverSchema.findOne({
      _id: guild?.id,
    });

    if (check && check.animeToggle == "false")
      return "The owner of this server has disabled anime";

    let content = interaction.options.getString("verb");
    let whosEyes = interaction.options.getString("hidden");
    if (whosEyes == "YES") {
      await interaction.deferReply({ephemeral: true});
    } else {
      await interaction.deferReply();
    }
    let image;

    if (content == "HUG") {
      image = await API.sfw.hug();
    } else if (content == "KISS") {
      image = await API.sfw.kiss();
    } else if (content == "PUNCH") {
      image = await API.sfw.punch();
    } else if (content == "KILL") {
      image = await API.sfw.kill();
    } else if (content == "CUDDLE") {
      image = await API.sfw.cuddle();
    } else {
      if (
        (channel.nsfw && !check) ||
        (channel.nsfw && check.nsfwToggle == "true")
      ) {
        if (content == "HENTAI") {
          image = await API.nsfw.hentai();
        } else if (content == "BOOBS") {
          image = await API.nsfw.boobs();
        } else if (content == "LESBIAN") {
          image = await API.nsfw.lesbian();
        } else {
          image =
            "https://cdn.discordapp.com/attachments/985350444626882590/985350958928257085/unknown.png";
        }
      } else {
        return await interaction.editReply({
          content:
            "Either this isn't a NSFW channel or the owner has disabled NSFW content",
        });
      }
    }
    const embed = new MessageEmbed()
      .setAuthor(member.displayName + " | Anime")
      .setColor("WHITE")
      .setImage(image.image || image);

    try {
      await interaction.editReply({
        embeds: [embed],
      });
    } catch {
      console.log("Error");
    }
  },
} as ICommand;
