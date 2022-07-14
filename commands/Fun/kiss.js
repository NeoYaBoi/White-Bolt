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
    name: "kiss",
    aliases: ["kiss", "smooch"],
    category: "Fun",
    description: "Kisses any specified user",
    expectedArgs: "<user>",
    minArgs: 1,
    slash: "both",
    guildOnly: true,
    cooldown: '5s',
    options: [
        {
            name: "user",
            description: "The user to kiss",
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */,
        },
    ],
    callback: ({ interaction, message, member, guild, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const check = yield serverSchema.findOne({
            _id: guild === null || guild === void 0 ? void 0 : guild.id,
        });
        let { image } = yield API.sfw.kiss();
        if (check && check.animeToggle == "false") {
            image =
                "https://cdn.discordapp.com/attachments/985350444626882590/985350575287861328/bar_kiss.gif";
        }
        if (interaction) {
            const targetMember = interaction.options.getUser("user");
            const embed = new discord_js_1.MessageEmbed().setColor("WHITE").setThumbnail(image)
                .setDescription(`
            <@${member.id}>
            
            ***KISSES***
            
            <@${targetMember.id}>`);
            return embed;
        }
        else {
            if (!args[0].startsWith("<@") && !args[0].startsWith("!"))
                return "You must specify someone to hug";
            if (!args[0].endsWith(">"))
                return "You must specify someone to hug";
            const embed = new discord_js_1.MessageEmbed().setColor("WHITE").setThumbnail(image)
                .setDescription(`
            <@${member.id}>
            
            ***KISSES***
            
            ${args[0]}`);
            return embed;
        }
    }),
};
