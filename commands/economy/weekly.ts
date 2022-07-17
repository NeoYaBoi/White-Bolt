import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from "../../config.json";
const userSchema = require("../../schemas/userSchema");
let weeklySays = [
  "You refunded your sentinels of light vandal and made",
  "You went onto fivrr and were paid for feet pics. You made",
  "Will rage quitted Valorant because you 1 tapped him with a sherif and somehow you made",
  "Hayley sold her Genshin account and gave you",
  "You were sued for genocide. You won then decided to sue the people who sued you. You made",
  "For some reason there was money inside your sister. You found",
  "You went back in time and dropped the rice cooker. Your salary was increased for your efforts and you made",
  "Spider man creamed inside his mask. He paid you to clean it. You made",
];

export default {
  name: "weekly",
  names: ["weekly", "w"],
  category: "Economy",
  description: `Gets your weekly amount of ${currency}`,
  slash: "both",
  guildOnly: true,
  cooldown: '7d',
  callback: async ({ interaction, message, user, member }) => {
    let ranWeek = Math.floor(Math.random() * weeklySays.length);
    let randInt = Math.floor(Math.random() * 500000) + 1;
    const userResult = await userSchema.findOne({ _id: user.id });
    let utoSet = 0;
    let muchGot = 0;
    let embed = new MessageEmbed()
      .setColor("WHITE")
      .setAuthor(
        `${member.displayName} | Weekly`,
        user.displayAvatarURL({ format: "jpg", dynamic: true })
      );
    if (!userResult) {
      utoSet = randInt + 1000;
    } else {
      utoSet = randInt + userResult.money;
    }
    if (userResult && userResult.level) {
      //checking level
      if (userResult.level == 1) {
        //level one gives 250k extra
        utoSet = utoSet + 250000;
        muchGot = randInt + 250000;
        embed
          .setColor("#644223")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997048972453629983/level_1.png"
          );
      } else if (userResult.level == 2) {
        //level two gives 400k extra
        utoSet = utoSet + 400000;
        muchGot = randInt + 400000;
        embed
          .setColor("#a7b2b9")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049363882848306/lever_2.png"
          );
      } else if (userResult.level == 3) {
        //level three gives 950k extra
        utoSet = utoSet + 950000;
        muchGot = randInt + 950000;
        embed
          .setColor("#f2ba2d")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049412067004456/level_3.png"
          );
      } else if (userResult.level == 4) {
        //level four gives 1.5mil extra
        utoSet = utoSet + 1500000;
        muchGot = randInt + 1500000;
        embed
          .setColor("#9b2b61")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049446795841607/level_4.png"
          );
      } else if (userResult.level == 5) {
        //level five gives 3mil extra
        utoSet = utoSet + 3000000;
        muchGot = randInt + 3000000;
        embed
          .setColor("#a084a3")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049483244351579/level_5.png"
          );
      }
    }
    await userSchema.findOneAndUpdate(
        {
            _id: user.id
        },
        {
            money: utoSet
        },
        {
            upsert: true
        }
    )
    embed.setDescription(`${weeklySays[ranWeek]} **${muchGot}**`)
    return embed
  },
} as ICommand;
