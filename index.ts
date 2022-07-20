import DiscordJS, { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import dotenv from "dotenv";
const { version } = require("./package.json");
let activities_list = [
  "with Black Bolt",
  "with your mother",
  "with Neo",
  `running version ${version}`,
];
dotenv.config();

console.log(`
###################################
#                                 #
#           WHITE BOLT            #
#                                 #
#              ${version}              #
#                                 #
###################################`);

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS
  ],
});

client.on("ready", () => {
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    messagesPath: path.join(__dirname, "messages.json"),
    featuresDir: path.join(__dirname, 'features'),
    testServers: ["995514550227046452"],
    mongoUri: process.env.MONGO,
    disabledDefaultCommands: [
      // 'help',
      // 'command',
      // 'language',
      // 'prefix',
      //"requiredrole",
    ],
  })
    .setBotOwner(["762918086349029386"])
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
        name: "Economy",
        emoji: "🪙",
      },
      {
        name: "Profile",
        emoji: "😐",
      },
      {
        name: "Owner",
        emoji: "💀",
        hidden: true,
      },
      {
        name: "Staff",
        emoji: "<:9445blurplestaff:995514804980686848>",
      },
    ])
    .setDefaultPrefix("%")
    .setColor("WHITE");
  setInterval(() => {
    const indexStat = Math.floor(
      Math.random() * (activities_list.length - 1) + 1
    );
    let Set = activities_list[indexStat]
    client.user?.setPresence({
      status: "online",
      activities: [{ name: Set }],
    });
    console.clear()
    console.log(`
###################################
#                                 #
#           WHITE BOLT            #
#                                 #
#              ${version}              #
#                                 #
###################################`);
    console.log(`
===================================
        The Current Status Is`);

    console.log(
      "\x1b[36m%s\x1b[0m",
      `
        "${Set}"`
    );
    console.log(`===================================`);
  }, 10000);
});
client.setMaxListeners(0)
client.login(process.env.TOKEN);
