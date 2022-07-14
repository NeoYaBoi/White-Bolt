"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: 'avatar',
    category: 'Utility',
    description: 'Returns the avatar of a specified user',
    expectedArgs: '<user>',
    slash: 'both',
    guildOnly: true,
    cooldown: '5s',
    options: [{
            name: "user",
            description: "The user who's avatar you would like to see",
            required: false,
            type: 6 /* ApplicationCommandOptionTypes.USER */
        }],
    callback: ({ interaction, message, member }) => {
        let mainUser = interaction.options.getUser('user') || member;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor("Avatar")
            .setImage(mainUser.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor("WHITE");
        return embed;
    },
};
