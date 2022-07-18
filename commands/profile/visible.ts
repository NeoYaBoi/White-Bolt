import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const profileSchema = require('../../schemas/profileSchema')

export default {
    name: 'visible',
    names: ['visible', 'vis'],
    category: 'Profile',
    description: 'Changes whether your profile is visible to other users.',
    expectedArgs: '<toggle>',
    maxArgs: 1,
    slash: 'both',
    cooldown: '10m',
    options: [{
        name: "toggle",
        description: "The toggle you would like to set.",
        type: ApplicationCommandOptionTypes.STRING,
        required: false,
        choices: [
            {
                name: "On",
                value: "true"
            },
            {
                name: "Off",
                value: "false"
            }
        ]
    }],
    callback: async ({ interaction, message, user }) => {
        let toggle = interaction.options.getString('toggle')
        const userResult = await profileSchema.findOne({_id: user.id})
        if(!toggle) {
            if(!userResult || !userResult.visible || userResult.visible == 'false') {
                return `Visible on your profile is set to false`
            } else {
                return  `Visible on your profile is set to true`
            }
        }
        await profileSchema.findOneAndUpdate(
            {
                _id: user.id
            },
            {
                visible: toggle
            },
            {
                upsert: true
            }
        )
        return `Visible on your profile is now set to **${toggle}**`
    },
} as ICommand