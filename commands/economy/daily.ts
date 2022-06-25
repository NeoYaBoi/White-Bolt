import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { currency } from "../../config.json";
const userSchema = require("../../schemas/userSchema");
let dailySays = [
'The avocado gods came down to earth and gave you',
'Step sis had a spare bit of cash in her draw, you counted',
'Mum gave you your daily pocket money, you made',
'You came across one of those super rare twisted and sold it for',
'Will took a shit, don\'t ask me how but you made',
'Neo refunded all his Valorant skins and gave you',
'Black Bolt gave you 168000 BBC, that converts into']

export default {
  name: "daily",
  aliases: ["daily", "d"],
  category: "Economy",
  description: `Gets your daily amount of ${currency}`,
  slash: "both",
  guildOnly: true,
  cooldown: '1d',
  callback: async ({ interaction, message, member }) => {
    let ranBeg = Math.floor(Math.random() * dailySays.length);
    let randInt = Math.floor(Math.random() * 100000) + 1;
    const userResult = await userSchema.findOne({ _id: member.id });
    let uToSet;
    let muchGot;
    //checking if user is in database
    if(!userResult || !userResult.money) {
        uToSet = 1000 + randInt
    } else {
        uToSet = userResult.money + randInt
    }
    //checking if user has level
    muchGot = randInt
    if(userResult.level) {
        muchGot = randInt + (userResult.level * 100000);
        uToSet = uToSet + (userResult.level * 100000);
    }
    //setting users money
    await userSchema.findOneAndUpdate({
        _id: member.id
    }, {
        money: uToSet
    }, {
        upsert: true
    })
    const embed = new MessageEmbed()
    .setColor("WHITE")
    .setAuthor(`${member.displayName} | Daily`, member.user.displayAvatarURL({ format: "jpg", dynamic: true }))
    .setDescription(`${dailySays[ranBeg]} **${muchGot} ${currency}**`)
    return embed
  },
} as ICommand;