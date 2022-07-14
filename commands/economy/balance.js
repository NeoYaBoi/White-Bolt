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
    name: "balance",
    aliases: ["balance", "bal", 'b'],
    category: "Economy",
    description: "Checks your balance",
    expectedArgs: "<user>",
    guildOnly: true,
    slash: "both",
    options: [
        {
            name: "user",
            description: "The user who's balance you would like to check",
            required: false,
            type: 6 /* ApplicationCommandOptionTypes.USER */,
        },
    ],
    callback: ({ interaction, message, member }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let user = message
            ? ((_b = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) === null || _b === void 0 ? void 0 : _b.user) || member.user
            : interaction.options.getUser("user") || member.user;
        let money;
        let xp;
        const userResult = yield userSchema.findOne({ _id: user.id });
        if (!userResult || !userResult.xp) {
            xp = 0;
        }
        else
            xp = userResult.xp;
        if (!userResult || !userResult.money) {
            yield userSchema.findOneAndUpdate({
                _id: user.id,
            }, {
                money: 1000,
            }, {
                upsert: true,
            });
            money = 1000;
        }
        else
            money = userResult.money;
        let total = xp / 2 + money;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user === null || user === void 0 ? void 0 : user.username} | Balance`, user.displayAvatarURL({ format: "jpg", dynamic: true }))
            .setDescription(`This user has **${money} ${config_json_1.currency}** and **${xp}xp** with a total worth of **${total} ${config_json_1.currency}**`)
            .setColor("WHITE");
        return embed;
    }),
};
