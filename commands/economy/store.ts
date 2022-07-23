import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { levels } from '../../items.json'
import { currency } from '../../config.json'

export default {
    name: 'store',
    names: ['store', 'shop', 's'],
    category: 'Economy',
    description: 'Gets the current store.',
    slash: 'both',
    callback: ({ member, user, prefix, client }) => {
        let embed = new MessageEmbed()
        .setAuthor(`${member.displayName} | Store`, user.displayAvatarURL({ format: "jpg", dynamic: true }))
        .setColor("WHITE")
        .addFields(
            {
                name: `> <:Level1:969799269542412319> Level 1`,
                value: `\`\`/buy level 1\`\` | 💵 ${levels.one.price} ${currency}`
            }, {
            name: "> <:Level2:969799270435782656> Level 2",
            value: `\`\`/buy level 2\`\` | 💵 ${levels.two.price} ${currency}`
        }, {
            name: `> <:Level3:969799270347735081> Level 3`,
            value: `\`\`/buy level 3\`\` | 💵 ${levels.three.price} ${currency}`
        }, {
            name: `> <:Level4:969799270251237436> Level 4`,
            value: `\`\`/buy level 4\`\` | 💵 ${levels.four.price} ${currency}`
        }, {
            name: `> <:Level5:969799270427402340> Level 5`,
            value: `\`\`/buy level 5\`\` | 💵 ${levels.five.price} ${currency}`
        })
        .setFooter("Currently only levels are available.")
        return embed
    },
} as ICommand

//all money lost in bets goes into pool that can be claimed once a day