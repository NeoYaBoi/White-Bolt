import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

export default {
    name: 'name',
    category: 'Profile',
    description: 'Changes your preferred name for your profile.',
    expectedArgs: '<name>',
    minArgs: 1,
    slash: 'both',
    testOnly: true,
    expectedArgsTypes: ['STRING'],
    callback: ({ interaction, message }) => {
        
    },
} as ICommand