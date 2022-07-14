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
exports.default = {
    name: "add",
    category: "Owner",
    description: "Adds money to a user",
    expectedArgs: "<amount> <user>",
    minArgs: 2,
    slash: "both",
    ownerOnly: true,
    hidden: true,
    expectedArgsTypes: ["NUMBER", "USER"],
    callback: ({ interaction, message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (message && !args[0].startsWith("<@"))
            return {
                custom: true,
                content: "Please specify someone to add money to.",
                ephemeral: true,
            };
        let user = message
            ? (_b = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) === null || _b === void 0 ? void 0 : _b.user
            : interaction.options.getUser("user");
        let amount = message
            ? parseFloat(args[0])
            : interaction.options.getNumber("amount");
        if (message) {
            if (isNaN(amount))
                return {
                    custom: true,
                    content: "You must specify a valid amount of money to add.",
                    ephemeral: true,
                };
        }
        const userResult = yield userSchema.findOne({ _id: user.id });
        let add;
        if (!userResult || !userResult.money) {
            add = 1000;
        }
        else {
            add = userResult.money;
        }
        let amountToSet = add + amount;
        yield userSchema.findOneAndUpdate({
            _id: user.id,
        }, {
            money: amountToSet,
        }, {
            upsert: true,
        });
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${user.username} | Money Added`)
            .addFields({ name: "Amount Added", value: `${amount}` }, { name: "New Amount", value: `${amountToSet}` })
            .setColor("WHITE");
        return embed;
    }),
};
