"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const { version } = require("./package.json");
let activities_list = [
    "with Black Bolt",
    "with your mother",
    "with Neo",
    `running version ${version}`,
];
dotenv_1.default.config();
console.log(`
###################################
#                                 #
#           WHITE BOLT            #
#                                 #
#              ${version}              #
#                                 #
###################################`);
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS
    ],
});
client.on("ready", () => {
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, "commands"),
        messagesPath: path_1.default.join(__dirname, "messages.json"),
        featuresDir: path_1.default.join(__dirname, 'features'),
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
        var _a;
        activities_list.push(`ping = ${Math.round(client.ws.ping)}ms`);
        const indexStat = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        let Set = activities_list[indexStat];
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            status: "online",
            activities: [{ name: Set }],
        });
        console.clear();
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
        console.log("\x1b[36m%s\x1b[0m", `
        "${Set}"`);
        console.log(`===================================`);
    }, 10000);
});
client.setMaxListeners(0);
client.login(process.env.TOKEN);
