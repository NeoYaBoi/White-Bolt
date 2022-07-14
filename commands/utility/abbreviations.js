"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: 'abbreviations',
    aliases: ['abbreviations', 'ab'],
    category: 'Utility',
    description: 'Gives the abbreviations inside the help menu',
    slash: 'both',
    callback: ({ interaction, message, member, instance, guild }) => {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${member.displayName} | Abbreviations`)
            .setDescription(instance.messageHandler.getEmbed(guild, "ABBREVIATIONS_HELP_MENU", "DESCRIPTION"))
            .addFields({
            name: "LRT",
            value: "Long Response Time"
        }, {
            name: "SOC",
            value: "Slash Only Command"
        })
            .setColor("WHITE");
        return embed;
    },
};
