import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { currency } from '../../config.json'
const userSchema = require('../../schemas/userSchema')

export default {
    names: ['leaderboard', 'lb'],
    aliases: ['leaderboard', 'lb'],
    category: 'Economy',
    description: 'Shows the current leaderboard',
    slash: 'both',
    testOnly: true,
    callback: ({ interaction, message, member }) => {
        return "This command will be available within a few days of White Bolts release"
        //Getting users with highest amount of money
        const results = userSchema.find().sort({ "money" : -1 })

        //creating embed to send
        let embed = new MessageEmbed()
        .setAuthor(member.displayName + " | Leaderboard")
        .setColor("WHITE")
        .addFields({
            name: `🏅 1st | ${results[0].levelbadge}`,
            value: `> 💵 **${results[0].money} ${currency}** | ${results[0]._id} | ${results[0].levelbadge}`
        }, {
            name: `🥈 2nd | ${results[1].levelbadge}`,
            value: `> 💵 **${results[1].money} ${currency}** | ${results[1]._id} | ${results[1].levelbadge}`
        }, {
            name: `🥉 3rd | ${results[2].levelbadge}`,
            value: `> 💵 **${results[2].money} ${currency}** | ${results[2]._id} | ${results[2].levelbadge}`
        }, {
            name: `4th | ${results[3].levelbadge}`,
            value: `> 💵 **${results[3].money} ${currency}** | ${results[3]._id} | ${results[3].levelbadge}`
        }, {
            name: `5th | ${results[4].levelbadge}`,
            value: `> 💵 **${results[4].money} ${currency}** | ${results[4]._id} | ${results[4].levelbadge}`
        }, {
            name: `6th | ${results[5].levelbadge}`,
            value: `> 💵 **${results[5].money} ${currency}** | ${results[5]._id} | ${results[5].levelbadge}`
        }, {
            name: `7th | ${results[6].levelbadge}`,
            value: `> 💵 **${results[6].money} ${currency}** | ${results[6]._id} | ${results[6].levelbadge}`
        }, {
            name: `8th | ${results[7].levelbadge}`,
            value: `> 💵 **${results[7].money} ${currency}** | ${results[7]._id} | ${results[7].levelbadge}`
        }, {
            name: `9th | ${results[8].levelbadge}`,
            value: `> 💵 **${results[8].money} ${currency}** | ${results[8]._id} | ${results[8].levelbadge}`
        }, {
            name: `10th | ${results[9].levelbadge}`,
            value: `> 💵 **${results[9].money} ${currency}** | ${results[9]._id} | ${results[9].levelbadge}`
        })
    },
} as ICommand