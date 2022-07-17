import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const profileSchema = require('../../schemas/profileSchema')

export default {
    name: 'manage',
    category: 'Owner',
    description: 'Manages a users profile (SOC)',
    expectedArgs: '<manage> <user> <true/false>',
    minArgs: 2,
    slash: 'both',
    ownerOnly: true,
    hidden: true,
    options: [{
        name: "manage",
        description: "The manage option you would like to choose.",
        type: ApplicationCommandOptionTypes.STRING,
        required: true,
        choices: [{
            name: "agelock",
            value: "AGELOCK"
        }]
    }, {
        name: "user",
        description: "The user you would like to manage.",
        type: ApplicationCommandOptionTypes.USER,
        required: true,
    }, {
        name: "toggle",
        description: "The toggle for the manage you selected",
        type: "STRING",
        required: true,
        choices: [{
            name: "true",
            value: "true"
        },{
            name: "false",
            value: "false"
        }]
    }],
    callback: async ({ interaction, message }) => {
        if(message) {
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
              };
        }
        let manage = interaction.options.getString('manage')!
        let toggle = interaction.options.getString('toggle')!
        let user = interaction.options.getUser('user')!

        if(manage == "AGELOCK") {
            await profileSchema.findOneAndUpdate(
                {
                    _id: user.id
                },
                {
                    ageLock: toggle
                },
                {
                    upsert: true
                }
            )
            return `${user.username}'s agelock has been set to ${toggle}`
        }
    },
} as ICommand