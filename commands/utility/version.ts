import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const version = require('../../package.json')

export default {
    name: 'version',
    names: ['version', 'update'],
    category: 'Utility',
    description: 'Gives the current version for the bot',
    slash: 'both',
    callback: ({ interaction, message }) => {
        return `The current version is **${version.version}**`
    },
} as ICommand