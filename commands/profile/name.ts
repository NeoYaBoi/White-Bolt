import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const profileSchema = require('../../schemas/profileSchema')

export default {
    name: 'name',
    category: 'Profile',
    description: 'Changes your preferred name for your profile.',
    expectedArgs: '<name>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    expectedArgsTypes: ['STRING'],
    callback: async ({ interaction, message, args, user }) => {
        let name = message ? args[0] : interaction.options.getString('name')!
        if(name?.length >= 15) {
            return {
                custom: true,
                content: "Your name must be under 15 characters.",
                ephemeral: true,
              };
        }
        await profileSchema.findOneAndUpdate(
            {
                _id: user.id
            },
            {
                name: name
            },
            {
                upsert: true
            }
        )
        return `Your new preferred name is set to **${name}**`
    },
} as ICommand