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
exports.config = void 0;
const discord_js_1 = require("discord.js");
const welcomeSchema = require("../schemas/welcomeSchema");
const serverSchema = require("../schemas/serverSchema");
exports.default = (client) => {
    client.on("guildMemberAdd", (member) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, id } = member;
        const guildResult = yield welcomeSchema.findOne({ _id: guild.id });
        const serverResult = yield serverSchema.findOne({ _id: guild.id });
        if (!guildResult)
            return;
        const channel = guild.channels.cache.get(guildResult.welcomeChannel);
        if (!channel)
            return;
        if (serverResult) {
            if (serverResult.welcomeToggle == "false")
                return;
        }
        let formalDesc = guildResult.embedDesc.replace(/{@}/g, `<@${id}>`);
        let finalDesc = formalDesc.replace(/{name}/g, member.user.username);
        let formalTitle = guildResult.embedTitle.replace(/{@}/g, `{cannot ping users in titles}`);
        let finalTitle = formalTitle.replace(/{name}/g, member.user.username);
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(finalTitle)
            .setDescription(finalDesc)
            .setColor("WHITE")
            .setThumbnail(member.user.displayAvatarURL({ format: "jpg", dynamic: true }))
            .setImage("https://cdn.discordapp.com/attachments/985350444626882590/990175224270028840/welcum.png");
        channel.send({ embeds: [embed] });
    }));
};
const config = {
    displayName: "Welcome",
    dbName: "Welcomes",
};
exports.config = config;
