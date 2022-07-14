"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: "ban",
    category: "Staff",
    description: "Bans a specified user",
    expectedArgs: "<user> <reason>",
    minArgs: 1,
    slash: "both",
    permissions: ["BAN_MEMBERS"],
    requireRoles: true,
    guildOnly: true,
    options: [
        {
            name: "user",
            description: "Specify a user to ban",
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */,
        },
        {
            name: "delete-messages",
            description: "Specifics what messages to delete of the user",
            required: false,
            type: 10 /* ApplicationCommandOptionTypes.NUMBER */,
            choices: [
                {
                    name: "None",
                    value: 0,
                },
                {
                    name: "7-Days",
                    value: 7,
                },
            ],
        },
        {
            name: "reason",
            description: "The reason this user is getting banned",
            required: false,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
        },
    ],
    callback: ({ interaction, message, member, args }) => {
        var _a;
        const whatToDel = message
            ? 0
            : interaction.options.getNumber("delete-messages") || 0;
        let user = message
            ? (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()
            : interaction.options.getMember("user");
        if (!user)
            return "I cannot find this user";
        if (!user.bannable) {
            return {
                custom: true,
                content: "I cannot ban this user",
                ephemeral: true,
            };
        }
        args.shift();
        var realReason = (message ? args.join(" ") : interaction.options.getString("reason")) ||
            "No reason provided";
        user.ban({ days: whatToDel, reason: realReason });
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.displayName} | Banned`)
            .setDescription(`This user has been banned with reason: *${realReason}*.`)
            .setColor("WHITE");
        return embed;
    },
};
