"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverSchema = require("../../schemas/serverSchema");
exports.default = {
    name: "modify",
    names: ["modify", "settings"],
    category: "Configuration",
    description: "Enabled you to change settings in the bot for your server (SOC)",
    expectedArgs: "<change> <on/off>",
    minArgs: 2,
    slash: "both",
    permissions: ["ADMINISTRATOR"],
    guildOnly: true,
    options: [
        {
            name: "setting",
            description: "Change a setting for your server.",
            required: true,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            choices: [
                {
                    name: "Anime",
                    value: "ANIME",
                },
                {
                    name: "NSFW",
                    value: "NSFW",
                },
                {
                    name: "Welcome",
                    value: "WELCOME",
                },
                {
                    name: "Confessions",
                    value: "CONFESSIONS",
                },
            ],
        },
        {
            name: "toggle",
            description: "Turn on or off",
            required: true,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            choices: [
                {
                    name: "Enable",
                    value: "true",
                },
                {
                    name: "Disable",
                    value: "false",
                },
            ],
        },
    ],
    callback: ({ interaction, message, guild, prefix }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message)
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
            };
        let setting = interaction.options.getString("setting");
        let toggle = interaction.options.getString("toggle");
        const serverResult = yield serverSchema.findOne({ _id: guild === null || guild === void 0 ? void 0 : guild.id });
        let content;
        if (setting == "ANIME") {
            yield serverSchema.findOneAndUpdate({
                _id: guild === null || guild === void 0 ? void 0 : guild.id,
            }, {
                animeToggle: toggle,
            }, {
                upsert: true,
            });
            content = `The anime toggle is now set to ${toggle}`;
        }
        else if (setting == "NSFW") {
            yield serverSchema.findOneAndUpdate({
                _id: guild === null || guild === void 0 ? void 0 : guild.id,
            }, {
                nsfwToggle: toggle,
            }, {
                upsert: true,
            });
            content = `The NSFW toggle is now set to ${toggle}`;
        }
        else if (setting == "WELCOME") {
            yield serverSchema.findOneAndUpdate({
                _id: guild === null || guild === void 0 ? void 0 : guild.id,
            }, {
                welcomeToggle: toggle,
            }, {
                upsert: true,
            });
            content = `The welcome toggle is now set to ${toggle}`;
        }
        else if (setting == "CONFESSIONS") {
            yield serverSchema.findOneAndUpdate({
                _id: guild === null || guild === void 0 ? void 0 : guild.id
            }, {
                confessionToggle: toggle
            }, {
                upsert: true
            });
            content = `The confession toggle is now set to ${toggle}`;
        }
        return content;
    }),
};
