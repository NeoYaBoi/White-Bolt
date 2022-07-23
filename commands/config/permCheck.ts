import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

export default {
    name: 'permcheck',
    names: ['permcheck', 'perms', 'check'],
    category: 'Config',
    description: 'Checks that the bot has all required permissions.',
    slash: 'both',
    testOnly: true,
    permissions: ['ADMINISTRATOR'],
    callback: ({ interaction, message, guild }) => {
        return `Coming Soon`
    },
} as ICommand