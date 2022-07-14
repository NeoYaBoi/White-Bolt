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
const confessionSchema = require("../../schemas/confessionSchema");
const serverSchema = require("../../schemas/confessionGuildSchema");
exports.default = {
    name: "confessions",
    aliases: ["confessions", "conf"],
    category: "Configuration",
    description: "Changes/sets the current confession channel. (SOC)",
    expectedArgs: "<confess_here_channel> <confession_channel>",
    minArgs: 2,
    slash: "both",
    guildOnly: true,
    permissions: ["ADMINISTRATOR"],
    expectedArgsTypes: ["CHANNEL", "CHANNEL"],
    callback: ({ interaction, message, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message)
            return {
                custom: true,
                content: "This is a slash only command.",
                ephemeral: true,
            };
        let confHerChan = interaction.options.getChannel("confess_here_channel");
        let confSenChan = interaction.options.getChannel("confession_channel");
        //checking if channel is text
        if (confHerChan.type != "GUILD_TEXT" || confSenChan.type != "GUILD_TEXT") {
            return {
                custom: true,
                content: "Please tag a channel to set.",
                ephemeral: true,
            };
        }
        yield serverSchema.findOneAndUpdate({
            _id: guild === null || guild === void 0 ? void 0 : guild.id,
        }, {
            confessions: 0,
            confessHere: confHerChan.id,
            confessSend: confSenChan.id,
        }, {
            upsert: true,
        });
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Confessions")
            .setDescription("Welcome to the deep dark confessions channel. All confessions are anonymous. Please follow the rules to keep it clean.")
            .addField("Rules", "• Do not break the Discord TOS\n • Do not post pointless confessions")
            .addField("Send your deepest darkest confessions below...", "\u200b")
            .setFooter("Confessions are anonymous but can be fetched by moderators")
            .setColor("WHITE");
        confHerChan.send({ embeds: [embed] });
        return `The confession channels have been set!`;
    }),
};
