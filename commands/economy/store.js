"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const items_json_1 = require("../../items.json");
const config_json_1 = require("../../config.json");
exports.default = {
    name: 'store',
    names: ['store', 'shop', 's'],
    category: 'Economy',
    description: 'Gets the current store.',
    slash: 'both',
    callback: ({ member, user, prefix, client }) => {
        let embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${member.displayName} | Store`, user.displayAvatarURL({ format: "jpg", dynamic: true }))
            .setColor("WHITE")
            .addFields({
            name: `> <:Level1:969799269542412319> Level 1`,
            value: `\`\`/buy level 1\`\` | 💵 ${items_json_1.levels.one.price} ${config_json_1.currency}`
        }, {
            name: "> <:Level2:969799270435782656> Level 2",
            value: `\`\`/buy level 2\`\` | 💵 ${items_json_1.levels.two.price} ${config_json_1.currency}`
        }, {
            name: `> <:Level3:969799270347735081> Level 3`,
            value: `\`\`/buy level 3\`\` | 💵 ${items_json_1.levels.three.price} ${config_json_1.currency}`
        }, {
            name: `> <:Level4:969799270251237436> Level 4`,
            value: `\`\`/buy level 4\`\` | 💵 ${items_json_1.levels.four.price} ${config_json_1.currency}`
        }, {
            name: `> <:Level5:969799270427402340> Level 5`,
            value: `\`\`/buy level 5\`\` | 💵 ${items_json_1.levels.five.price} ${config_json_1.currency}`
        })
            .setFooter("Currently only levels are available.");
        return embed;
    },
};
//all money lost in bets goes into pool that can be claimed once a day
