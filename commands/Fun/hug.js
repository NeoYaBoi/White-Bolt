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
const serverSchema = require('../../schemas/serverSchema');
const anime = require('anime-images-api');
const API = new anime();
exports.default = {
    name: 'hug',
    aliases: ["hug", "cuddle"],
    category: 'Fun',
    description: 'Hugs any specified user',
    expectedArgs: '<user>',
    minArgs: 1,
    slash: 'both',
    guildOnly: true,
    cooldown: '5s',
    options: [{
            name: 'user',
            description: 'A user to hug',
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */
        }],
    callback: ({ interaction, message, args, member, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        const check = yield serverSchema.findOne({
            _id: guild === null || guild === void 0 ? void 0 : guild.id
        });
        let { image } = yield API.sfw.hug();
        if (check && check.animeToggle == "false") {
            image = "https://cdn.discordapp.com/attachments/985350444626882590/985350958928257085/unknown.png";
        }
        if (interaction) {
            const targetMember = interaction.options.getUser('user');
            const embed = new discord_js_1.MessageEmbed()
                .setColor("WHITE")
                .setThumbnail(image)
                .setDescription(`
            <@${member.id}>
            
            ***HUGS***
            
            <@${targetMember.id}>`);
            return embed;
        }
        else {
            if (!args[0].startsWith("<@") && !args[0].startsWith("!"))
                return "You must specify someone to hug";
            if (!args[0].endsWith(">"))
                return "You must specify someone to hug";
            const embed = new discord_js_1.MessageEmbed()
                .setColor("WHITE")
                .setThumbnail(image)
                .setDescription(`
            <@${member.id}>
            
            ***HUGS***
            
            ${args[0]}`);
            return embed;
        }
    }),
};
