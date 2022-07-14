"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: 'ping',
    category: "Utility",
    description: "Gives the current response time of the bot.",
    slash: 'both',
    callback: ({ user, member, client, instance, guild }) => {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${member.displayName} | Ping`, user.displayAvatarURL({ format: "jpg", dynamic: true }))
            .setDescription(instance.messageHandler.get(guild, 'PING', {
            PING: Math.round(client.ws.ping)
        }))
            .setColor("WHITE");
        return embed;
    }
};
