import { ICommand } from 'wokcommands'
import { MessageEmbed } from "discord.js";

export default {
    name: 'ping',
    category: "Utility",
    description: "Gives the current response time of the bot.",
    slash: 'both',
    callback: ({user, member, client, instance, guild}) => {
        const embed = new MessageEmbed()
        .setAuthor(`${member.displayName} | Ping`, user.displayAvatarURL({ format: "jpg", dynamic: true }))
        .setDescription(instance.messageHandler.get(guild, 'PING', {
            PING: Math.round(client.ws.ping)
        }))
        .setColor("WHITE")
        return embed
    }
} as ICommand