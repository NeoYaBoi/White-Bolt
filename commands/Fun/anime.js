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
const discord_js_1 = require("discord.js");
const serverSchema = require("../../schemas/serverSchema");
const anime = require("anime-images-api");
const API = new anime();
exports.default = {
    name: "anime",
    category: "Fun",
    description: "Gives a anime gif of your choice (SOC) (LRT)",
    expectedArgs: "<anime verb>",
    minArgs: 1,
    slash: "both",
    guildOnly: true,
    cooldown: "5s",
    options: [
        {
            name: "verb",
            description: "A verb to fetch the gif about",
            required: true,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
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
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
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
    callback: ({ interaction, message, guild, channel, member }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message)
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
            };
        const check = yield serverSchema.findOne({
            _id: guild === null || guild === void 0 ? void 0 : guild.id,
        });
        if (check && check.animeToggle == "false")
            return "The owner of this server has disabled anime";
        let content = interaction.options.getString("verb");
        let whosEyes = interaction.options.getString("hidden");
        if (whosEyes == "YES") {
            yield interaction.deferReply({ ephemeral: true });
        }
        else {
            yield interaction.deferReply();
        }
        let image;
        if (content == "HUG") {
            image = yield API.sfw.hug();
        }
        else if (content == "KISS") {
            image = yield API.sfw.kiss();
        }
        else if (content == "PUNCH") {
            image = yield API.sfw.punch();
        }
        else if (content == "KILL") {
            image = yield API.sfw.kill();
        }
        else if (content == "CUDDLE") {
            image = yield API.sfw.cuddle();
        }
        else {
            if ((channel.nsfw && !check) ||
                (channel.nsfw && check.nsfwToggle == "true")) {
                if (content == "HENTAI") {
                    image = yield API.nsfw.hentai();
                }
                else if (content == "BOOBS") {
                    image = yield API.nsfw.boobs();
                }
                else if (content == "LESBIAN") {
                    image = yield API.nsfw.lesbian();
                }
                else {
                    image =
                        "https://cdn.discordapp.com/attachments/985350444626882590/985350958928257085/unknown.png";
                }
            }
            else {
                return yield interaction.editReply({
                    content: "Either this isn't a NSFW channel or the owner has disabled NSFW content",
                });
            }
        }
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(member.displayName + " | Anime")
            .setColor("WHITE")
            .setImage(image.image || image);
        try {
            yield interaction.editReply({
                embeds: [embed],
            });
        }
        catch (_a) {
            console.log("Error");
        }
    }),
};
