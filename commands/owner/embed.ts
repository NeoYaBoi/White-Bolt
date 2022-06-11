import { ICommand } from 'wokcommands'
import { MessageEmbed, Options } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

export default {
    category: 'testing',
    names: ['embed'],
    description: 'Sends a custom embed',
    expectedArgs: '<embed>',
    hidden: true,
    slash: true,
    testOnly: true,
    permissions: ['ADMINISTRATOR'],
    options: [{
        name: 'Embed',
        description: 'The content you would like in the embed',
        required: true,
        type: ApplicationCommandOptionTypes.STRING
    }],

    callback: () => {
        
        const embed = new MessageEmbed()
        .setDescription("fds")
        return embed
    }
} as ICommand