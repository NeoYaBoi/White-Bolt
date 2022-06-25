import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const confessionSchema = require("../../schemas/confessionSchema");
const serverSchema = require("../../schemas/confessionGuildSchema");

export default {
  name: "confessions",
  aliases: ["confessions", "conf"],
  category: "Configuration",
  description: "Changes/sets the current confession channel. (SOC)",
  expectedArgs: "<confess_here_channel> <confession_channel>",
  minArgs: 2,
  slash: "both",
  guildOnly: true,
  permissions: ["ADMINISTRATOR"],
  expectedArgsTypes: ["CHANNEL", "CHANNEL"],
  callback: async ({ interaction, message, guild }) => {
    if (message)
      return {
        custom: true,
        content: "This is a slash only command.",
        ephemeral: true,
      };
    let confHerChan = interaction.options.getChannel("confess_here_channel")!;
    let confSenChan = interaction.options.getChannel("confession_channel")!;
    //checking if channel is text
    if (confHerChan.type != "GUILD_TEXT" || confSenChan.type != "GUILD_TEXT") {
      return {
        custom: true,
        content: "Please tag a channel to set.",
        ephemeral: true,
      };
    }
    await serverSchema.findOneAndUpdate(
      {
        _id: guild?.id,
      },
      {
        confessions: 0,
        confessHere: confHerChan.id,
        confessSend: confSenChan.id,
      },
      {
        upsert: true,
      }
    );
    const embed = new MessageEmbed()
    .setTitle("Confessions")
    .setDescription("Welcome to the deep dark confessions channel. All confessions are anonymous. Please follow the rules to keep it clean.")
    .addField("Rules", "• Do not break the Discord TOS\n • Do not post pointless confessions")
    .addField("Send your deepest darkest confessions below...", "\u200b")
    .setFooter("Confessions are anonymous but can be fetched by moderators")
    .setColor("WHITE")
    confHerChan.send({embeds: [embed]})
    return `The confession channels have been set!`
  },
} as ICommand;