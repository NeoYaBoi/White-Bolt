import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

export default {
    name: 'abbreviations',
    aliases: ['abbreviations', 'ab'],
    category: 'Utility',
    description: 'Gives the abbreviations inside the help menu',
    slash: 'both',
    callback: ({ interaction, message, member, instance, guild }) => {
        const embed = new MessageEmbed()
        .setAuthor(`${member.displayName} | Abbreviations`)
        .setDescription(instance.messageHandler.getEmbed(guild, "ABBREVIATIONS_HELP_MENU", "DESCRIPTION"))
        .addFields({
            name: "LRT",
            value: "Long Response Time"
        }, {
            name: "SOC",
            value: "Slash Only Command"
        })
        .setColor("WHITE")
        return embed
    },
} as ICommand