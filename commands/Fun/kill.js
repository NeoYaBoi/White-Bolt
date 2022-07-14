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
    name: "kill",
    aliases: ["kill", "murder"],
    category: "Fun",
    description: "Kills a specified user",
    expectedArgs: "<user>",
    minArgs: 1,
    slash: "both",
    cooldown: '5s',
    guildOnly: true,
    options: [
        {
            name: "user",
            description: "A user to kill",
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */,
        },
    ],
    callback: ({ interaction, message, guild, args, member }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const check = yield serverSchema.findOne({
            _id: guild === null || guild === void 0 ? void 0 : guild.id,
        });
        let { image } = yield API.sfw.kill();
        if (check && check.animeToggle == "false") {
            image =
                "https://cdn.discordapp.com/attachments/985350444626882590/985350958928257085/unknown.png";
        }
        let user = message ? args[0] : `<@${(_a = interaction.options.getUser('user')) === null || _a === void 0 ? void 0 : _a.id}>`;
        const embed = new discord_js_1.MessageEmbed().setColor("WHITE").setThumbnail(image)
            .setDescription(`
            <@${member.id}>
            
            ***KILLS***
            
            ${user}`);
        return embed;
    }),
};
