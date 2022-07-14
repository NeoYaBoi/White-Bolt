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
    name: "bet",
    category: "Economy",
    description: "Bets money",
    expectedArgs: "<amount>",
    minArgs: 1,
    guildOnly: true,
    slash: "both",
    expectedArgsTypes: ["NUMBER"],
    callback: ({ interaction, message, member, args, prefix, guild, instance, }) => __awaiter(void 0, void 0, void 0, function* () {
        let amount = message ? args[0] : interaction.options.getNumber("amount");
        let amountToSet;
        let wOrL;
        let dILose;
        let embed = new discord_js_1.MessageEmbed();
        const coinFlp = Math.floor(Math.random() * 2) + 1;
        const userResult = yield userSchema.findOne({ _id: member.id });
        if (interaction)
            prefix = "/";
        if (!userResult || !userResult.money)
            return {
                custom: true,
                content: `You do not have any money to bet. Please use \`${prefix}balance\` to check your amount.`,
                ephemeral: true,
            };
        if (message) {
            if (isNaN(parseFloat(args[0]))) {
                return {
                    custom: true,
                    content: "You must specify a valid number",
                    ephemeral: true,
                };
            }
        }
        if (coinFlp == 1) {
            //LOSS
            amountToSet = userResult.money - parseFloat(args[0]);
            wOrL = "LOSE";
            dILose = "You just lost";
            embed
                .setColor("DARK_RED")
                .setThumbnail("https://cdn.discordapp.com/attachments/985350444626882590/986187072329121872/gam_lose.jpg");
        }
        else if (coinFlp == 2) {
            //WIN
            amountToSet = userResult.money + parseFloat(args[0]);
            wOrL = "WIN";
            dILose = "You just won";
            embed
                .setColor("GREEN")
                .setThumbnail("https://cdn.discordapp.com/attachments/985350444626882590/986186651053195284/gam_win.jpg");
        }
        else {
            return instance.messageHandler.get(guild, "EXCEPTION");
        }
        if (userResult.money + 1 <= amount)
            return {
                custom: true,
                content: "You do not have enough money",
                ephemeral: true,
            };
        yield userSchema.findOneAndUpdate({
            _id: member.id,
        }, {
            money: amountToSet,
        }, {
            upsert: true,
        });
        embed
            .setTitle(`Bet | ${wOrL}`)
            .setDescription(`${dILose} **${amount} ${config_json_1.currency}**`)
            .setFooter(`New Balance: ${amountToSet} ${config_json_1.currency}`)
            .setFooter(instance.messageHandler.get(guild, "IMAGE-TEST"));
        return embed;
    }),
};
