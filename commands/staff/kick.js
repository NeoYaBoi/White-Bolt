"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: "kick",
    category: "Staff",
    description: "Kicks a specified user",
    expectedArgs: "<user> <reason>",
    minArgs: 1,
    slash: "both",
    permissions: ["KICK_MEMBERS"],
    requireRoles: true,
    guildOnly: true,
    options: [
        {
            name: "user",
            description: "Specify a user to kick",
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */,
        },
        {
            name: "reason",
            description: "The reason this user is getting kicked",
            required: false,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
        },
    ],
    callback: ({ interaction, message, member, args }) => {
        var _a;
        let user = message
            ? (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()
            : interaction.options.getMember("user");
        if (!user)
            return "I cannot find this user";
        if (!user.kickable) {
            return {
                custom: true,
                content: "I cannot kick this user",
                ephemeral: true,
            };
        }
        args.shift();
        var realReason = (message ? args.join(" ") : interaction.options.getString("reason")) ||
            "No reason provided";
        user.kick(realReason);
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.displayName} | Kicked`)
            .setDescription(`This user has been kicked with reason: *${realReason}*.`)
            .setColor("WHITE");
        return embed;
    },
};
