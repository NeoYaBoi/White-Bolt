import DiscordJS, { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import dotenv from "dotenv";
const { version } = require("./package.json")
dotenv.config();

console.log(`
###################################
#                                 #
#           WHITE BOLT            #
#                                 #
#              ${version}              #
#                                 #
###################################`)

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    typeScript: true,
    testServers: ["984917713224859699"],
    mongoUri: process.env.MONGO,
    disabledDefaultCommands: [
      // 'help',
      // 'command',
      // 'language',
      // 'prefix',
      //"requiredrole",
    ],
  })
    .setBotOwner(["555991737072615424"])
    .setCategorySettings([
      {
        name: "Utility",
        emoji: "🔨",
      },
      {
        name: "Fun",
        emoji: "🎉",
      },
      {
        name: "Staff",
        emoji: "<:SEVE:985474827647352852>",
        hidden: true
      }
    ])
    .setDefaultPrefix("%")
    .setColor("WHITE");
});
client.login(process.env.TOKEN);