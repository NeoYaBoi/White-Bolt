import { ICommand } from "wokcommands";
import { Message, MessageEmbed, MessagePayload } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const { request } = require("undici");

export default {
  name: "cat",
  aliases: ["cat", "kitty"],
  category: "Fun",
  description: "Gives a random cat image. (LRT)",
  cooldown: '5s',
  slash: "both",
  callback: async ({ interaction, member, message, instance, guild }) => {
    if (interaction) {
      interaction.deferReply();
    }
    async function getJSONResponse(body: String) {
      let fullBody = "";
      for await (const data of body) {
        fullBody += data.toString();
      }
      return JSON.parse(fullBody);
    }
    const catResult = await request("https://aws.random.cat/meow");
    const { file } = await getJSONResponse(catResult.body);
    if (message) {
      message.reply({ files: [file], content: "Here is your cat image." });
    } else {
      interaction.editReply({
        files: [file],
        content: "Here is your cat image.",
      });
    }
  },
} as ICommand;