import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const profileSchema = require('../../schemas/profileSchema')

export default {
    name: 'sexuality',
    category: 'Profile',
    description: 'Changes your specified sexuality for your profile. (SOC)',
    expectedArgs: '<sexuality>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    options: [
        {
            name: "sexuality",
            description: "The sexuality you would like to set.",
            type: ApplicationCommandOptionTypes.STRING,
            required: true,
            choices: [
                {
                    name: "Straight",
                    value: "Straight"
                },
                {
                    name: "Gay",
                    value: "Gay"
                },
                {
                    name: "Lesbian",
                    value: "Lesbian"
                },
                {
                    name: "Bisexual",
                    value: "Bisexual"
                },
                {
                    name: "Omnisexual",
                    value: "Omnisexual"
                },
                {
                    name: "Pansexual",
                    value: "Pansexual"
                },
                {
                    name: "Asexual",
                    value: "Asexual"
                },
                {
                    name: "Other",
                    value: "Other"
                }
            ]
        }
    ],
    callback: async ({ interaction, message, user }) => {
        if(message) {
            return {
                custom: true,
                content: "This is a slash only command.",
                ephemeral: true,
              };
        }
        let sexuality = interaction.options.getString('sexuality')
        await profileSchema.findOneAndUpdate(
            {
                _id: user.id
            },
            {
                sexuality: sexuality
            },
            {
                upsert: true
            }
        )
        return `Your sexuality is now set to ${sexuality}`
    },
} as ICommand