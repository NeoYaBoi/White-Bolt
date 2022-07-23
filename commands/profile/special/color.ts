import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const userSchema = require('../../../schemas/userSchema')
const profileSchema = require('../../../schemas/profileSchema')
const { specialCmdLevel } = require('../../../config.json')
let colors = [
    'WHITE',
    'BLUE',
    'GREEN',
    'PURPLE',
    'DARK_VIVID_PINK',
    'BLACK',
    'RED',
    'YELLOW',
    'RANDOM'
]

export default {
    name: 'colour',
    names: ['colour', 'color'],
    category: 'Profile',
    description: 'Changes the colour of your profile embed. (SOC)',
    expectedArgs: '<colour>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    options: [{
        name: "colour",
        description: "The colour you would like to choose.",
        type: ApplicationCommandOptionTypes.STRING,
        required: true,
        choices: [
            {
                name: "White",
                value: "WHITE"
            },
            {
                name: "Blue",
                value: "BLUE"
            },
            {
                name: "Green",
                value: "GREEN"
            },
            {
                name: "Purple",
                value: "PURPLE"
            },
            {
                name: "Dark_Vivid_Pink",
                value: "DARK_VIVID_PINK"
            },
            {
                name: "Black",
                value: "BLACK"
            },
            {
                name: "Red",
                value: "RED"
            },
            {
                name: "Yellow",
                value: "YELLOW"
            },
            {
                name: "Random",
                value: "RANDOM"
            }
        ]
    }],
    callback: async ({ interaction, message, user }) => {
        if(message) {
            return {
                custom: true,
                content: "This is a slash only command.",
                ephemeral: true,
              };
        }
        const userResult = await userSchema.findOne({_id: user.id})
        if(!userResult || !userResult.level || userResult.level <= specialCmdLevel) {
            return {
                custom: true,
                content: "You are not of the required level.",
                ephemeral: true,
              };
        }
        let color = interaction.options.getString('colour')
        let RealColor = "N/A"!
        colors.forEach(element => {
            if(element == color) {
                RealColor = element
            }
        });
        await profileSchema.findOneAndUpdate(
            {
                _id: user.id
            },
            {
                embedColor: RealColor
            },
            {
                upsert: true
            }
        )
        return `Your new embed colour was set to **${RealColor.toLowerCase()}**`
    },
} as ICommand