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
const itemSchema = require("../../schemas/itemSchema");
const userSchema = require("../../schemas/userSchema");
exports.default = {
    name: "buy",
    category: "Economy",
    description: "Buys specific items. (SOC)",
    expectedArgs: "<item>",
    minArgs: 1,
    slash: "both",
    testOnly: true,
    options: [
        {
            name: "item",
            description: "The item you would like to purchase",
            required: true,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            choices: [
                {
                    name: "test",
                    value: "test",
                },
            ],
        },
    ],
    callback: ({ interaction, message, member }) => __awaiter(void 0, void 0, void 0, function* () {
        return "This command is currently unavailable";
        if (message) {
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
            };
        }
        let item = interaction.options.getString("item");
        const userResult = yield userSchema.findOne({ _id: member.id });
        if (!userResult || !userResult.money) {
            return {
                custom: true,
                content: "You do not have any money.",
                ephemeral: true,
            };
        }
        if (item == "test") {
        }
        let embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${member.displayName} | Item`)
            .setColor("WHITE");
    }),
};
