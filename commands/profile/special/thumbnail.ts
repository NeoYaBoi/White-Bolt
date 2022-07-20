import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const profileSchema = require('../../../schemas/profileSchema')
const { specialCmdLevel } = require('../../../config.json')

export default {
    name: 'thumbnail',
    names: ['thumbnail', 'thumb'],
    category: 'Profile',
    description: 'Changes the thumbnail on your profile',
    expectedArgs: '<thumbnail>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    expectedArgsTypes: ['STRING'],
    callback: async ({ interaction, message, args, user }) => {
        let thumbnail = message ? args[0] : interaction.options.getString('thumbnail')!
        if(!thumbnail.startsWith('http://') && !thumbnail.startsWith('https://')) {
            return {
                custom: true,
                content: "This is not a valid thumbnail.",
                ephemeral: true,
              };
        }
        const profileResult = await profileSchema.findOne({_id: user.id})
        if(!profileResult || (profileResult.level && profileResult.level <= specialCmdLevel)) {
            return {
                custom: true,
                content: "You are not of the required level.",
                ephemeral: true,
             };
        }
        await profileSchema.findOneAndUpdate(
            {
                _id: user.id
            },
            {
                thumbnail: thumbnail
            },
            {
                upsert: true
            })
        let embed = new MessageEmbed()
        .setTitle("New Thumbnail")
        .setDescription("Your new thumbnail has been set to")
        .setImage(thumbnail)
        .setColor('WHITE')

        return embed
    },
} as ICommand