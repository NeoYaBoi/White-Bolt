import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const profileSchema = require('../../schemas/profileSchema')

export default {
    name: 'gender',
    category: 'Profile',
    description: 'Changes your profile gender',
    expectedArgs: '<gender>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    options: [{
        name: 'gender',
        description: 'The desired gender.',
        type: ApplicationCommandOptionTypes.STRING,
        required: true
    }],
    callback: async ({ interaction, message, args, user }) => {
        let gender = message ? args[0] : interaction.options.getString('gender')!
        if(gender?.length >= 15) {
            return {
                custom: true,
                content: "Your gender must be under 15 characters.",
                ephemeral: true,
              };
        }
        await profileSchema.findOneAndUpdate(
            {
                _id: user.id
            },
            {
                gender: gender
            },
            {
                upsert: true
            }
        )
        return `Your new gender has been set to **${gender}**`
    },
} as ICommand