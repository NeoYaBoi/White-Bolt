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
const config_json_1 = require("../../config.json");
const userSchema = require("../../schemas/userSchema");
exports.default = {
    name: "deduct",
    aliases: ["deduct", "ded"],
    category: "Owner",
    description: "Deducts money from a user.",
    expectedArgs: "<amount> <user>",
    minArgs: 1,
    slash: "both",
    ownerOnly: true,
    hidden: true,
    options: [{
            name: "amount",
            description: "The amount you would like to deduct.",
            required: true,
            type: 10 /* ApplicationCommandOptionTypes.NUMBER */
        }, {
            name: "user",
            description: "The use you would like to deduct money from.",
            required: true,
            type: 6 /* ApplicationCommandOptionTypes.USER */
        }],
    callback: ({ interaction, message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (message && (!args[1] || !((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()))) {
            return {
                custom: true,
                content: "Please @ someone to deduct money from.",
                ephemeral: true,
            };
        }
        let user = message
            ? (_c = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()) === null || _c === void 0 ? void 0 : _c.user
            : interaction.options.getUser("user");
        let amount = message
            ? parseFloat(args[0])
            : interaction.options.getNumber("amount");
        if (message && isNaN(amount)) {
            return {
                custom: true,
                content: "Please specify a valid amount to add.",
                ephemeral: true,
            };
        }
        const userResult = yield userSchema.findOne({ _id: user.id });
        let amtToSet;
        if (!userResult) {
            amtToSet = amount + 1000;
        }
        else {
            amtToSet = userResult.money - amount;
        }
        yield userSchema.findOneAndUpdate({
            _id: user.id,
        }, {
            money: amtToSet,
        }, {
            upsert: true,
        });
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.username} | Money Deducted`)
            .setColor("WHITE")
            .setDescription(`**${amount} ${config_json_1.currency}** were deducted from that user.`);
        return embed;
    }),
};
