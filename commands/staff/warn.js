"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const userSchema = require("../../schemas/userSchema");
const warnSchema = require("../../schemas/warnSchema");
exports.default = {
    name: "warn",
    category: "Staff",
    description: "Warns a specified user (SOC)",
    expectedArgs: "<user> <reason>",
    minArgs: 1,
    slash: "both",
    guildOnly: true,
    hidden: true,
    permissions: ["KICK_MEMBERS"],
    requireRoles: true,
    options: [
        {
            name: "user",
            description: "The user to warn",
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */,
        },
        {
            name: "reason",
            description: "The reason this user is receiving a warning",
            required: false,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
        },
    ],
    callback: ({ interaction, message, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (message)
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
            };
        if ((guild === null || guild === void 0 ? void 0 : guild.id) != "804323987106168842" && (guild === null || guild === void 0 ? void 0 : guild.id) != "984917713224859699")
            return "Currently this command is unavailable";
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided.";
        const ID = `$${Math.floor(Math.random() * (100000 - 10000000)) + 1}`;
        var currentDate = new Date();
        var time = currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " @ " +
            currentDate.getHours() +
            ":" +
            currentDate.getMinutes() +
            ":" +
            currentDate.getSeconds();
        const userResult = yield userSchema.findOne({ _id: user.id });
        let toSet;
        if (!userResult || !userResult.warns) {
            toSet = 1;
        }
        else
            toSet = userResult.warns + 1;
        yield userSchema.findOneAndUpdate({
            _id: user.id,
        }, {
            warns: toSet,
        }, {
            upsert: true,
        });
        yield warnSchema.findOneAndUpdate({
            _id: ID,
        }, {
            reason: reason,
            time: time,
            moderator: (_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.username,
            warnNumber: toSet,
            user: user.id,
        }, {
            upsert: true,
        });
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.username} | Warning ${toSet}`)
            .setColor("WHITE")
            .setFooter(`ID: ${ID}`)
            .addFields({
            name: "Reason",
            value: reason,
        }, {
            name: "User Warned",
            value: `<@${user === null || user === void 0 ? void 0 : user.id}>`,
        });
        return embed;
    }),
};
