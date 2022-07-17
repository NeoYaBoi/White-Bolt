import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

export default {
    name: 'profile',
    names: ['profile', 'pf'],
    category: 'Utility',
    description: 'Gets a users profile',
    expectedArgs: '<user>',
    minArgs: 0,
    maxArgs: 1,
    slash: 'both',
    testOnly: true,
    expectedArgsTypes: ["USER"],
    callback: ({ interaction, message }) => {
        
    },
} as ICommand