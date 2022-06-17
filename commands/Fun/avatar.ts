import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'

export default {
    name: 'avatar',
    category: 'Utility',
    description: 'Returns the avatar of a specified user',
    expectedArgs: '<user>',
    slash: 'both',
    guildOnly: true,
    cooldown: '5s',
    options: [{
        name: "user",
        description: "The user who's avatar you would like to see",
        required: false,
        type: ApplicationCommandOptionTypes.USER
    }],

    callback: ({ interaction, message, member }) => {
       let mainUser = interaction.options.getUser('user')! || member!
       const embed = new MessageEmbed() 
       .setAuthor("Avatar")
       .setImage(mainUser.displayAvatarURL({ size: 1024, dynamic: true }))
       .setColor("WHITE")
       return embed
    },
} as ICommand