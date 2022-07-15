import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from "../../config.json";
const userSchema = require("../../schemas/userSchema");
let dailySays = [
  "The avocado gods came down to earth and gave you",
  "Step sis had a spare bit of cash in her draw, you counted",
  "Mum gave you your daily pocket money, you made",
  "You came across one of those super rare twisted and sold it for",
  "Will took a shit, don't ask me how but you made",
  "Neo refunded all his Valorant skins and gave you",
  "Black Bolt gave you 168000 BBC, that converts into",
];

export default {
  name: "daily",
  aliases: ["daily", "d"],
  category: "Economy",
  description: `Gets your daily amount of ${currency}`,
  slash: "both",
  guildOnly: true,
  cooldown: "1d",
  callback: async ({ interaction, message, member }) => {
    let ranBeg = Math.floor(Math.random() * dailySays.length);
    let randInt = Math.floor(Math.random() * 100000) + 1;
    const userResult = await userSchema.findOne({ _id: member.id });
    let uToSet;
    let muchGot;
    let embed = new MessageEmbed().setColor("WHITE");
    //checking if user is in database
    if (!userResult || !userResult.money) {
      uToSet = 1000 + randInt;
    } else {
      uToSet = userResult.money + randInt;
    }
    //checking if user has level
    muchGot = randInt;
    if (userResult && userResult.level) {
        muchGot = randInt + userResult.level * 100000;
        uToSet = uToSet + userResult.level * 100000;
        //checking what level
        if ((userResult.level = 1)) {
          embed
            .setColor("#644223")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/995514908584189973/997048972453629983/level_1.png"
            );
        } else if ((userResult.level = 2)) {
          embed
            .setColor("#a7b2b9")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/995514908584189973/997049363882848306/lever_2.png"
            );
        } else if ((userResult.level = 3)) {
          embed
            .setColor("#f2ba2d")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/995514908584189973/997049412067004456/level_3.png"
            );
        } else if ((userResult.level = 4)) {
          embed
            .setColor("#9b2b61")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/995514908584189973/997049446795841607/level_4.png"
            );
        } else if ((userResult.level = 5)) {
          embed
            .setColor("#a084a3")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/995514908584189973/997049483244351579/level_5.png"
            );
        }
      }
    //setting users money
    await userSchema.findOneAndUpdate(
      {
        _id: member.id,
      },
      {
        money: uToSet,
      },
      {
        upsert: true,
      }
    );
    embed
      .setAuthor(
        `${member.displayName} | Daily`,
        member.user.displayAvatarURL({ format: "jpg", dynamic: true })
      )
      .setDescription(`${dailySays[ranBeg]} **${muchGot} ${currency}**`);
    return embed;
  },
} as ICommand;
