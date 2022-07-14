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
const begOp = [
    "A goldfish appeared and gave you ",
    "Fine, here is ",
    "God answered your wishes and gave you ",
    "William Worral appeared in front of you and gave you ",
    "Black Bolt came back to life and gave you ",
    "You looked at your feet and found "
];
exports.default = {
    name: "beg",
    category: "Economy",
    description: "Begs for free coins.",
    slash: "both",
    guildOnly: true,
    callback: ({ member, instance, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        let ranBeg = Math.floor(Math.random() * begOp.length);
        const userResult = yield userSchema.findOne({ _id: member.id });
        const amount = Math.floor(Math.random() * 5000) + 1;
        let toSet;
        if (!userResult || !userResult.money) {
            toSet = amount + 1000;
        }
        else if (userResult.money >= 10000) {
            return {
                custom: true,
                content: "You already have enough",
                ephemeral: true,
            };
        }
        else {
            toSet = userResult.money + amount;
        }
        yield userSchema.findOneAndUpdate({
            _id: member.id,
        }, {
            money: toSet,
        }, {
            upsert: true,
        });
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`${member.displayName} | Beg`)
            .setDescription(`${begOp[ranBeg]} **${amount} ${config_json_1.currency}**`)
            .setColor("WHITE")
            .setThumbnail("https://cdn.discordapp.com/attachments/985350444626882590/986823262623379507/beg_man.jpg")
            .setFooter(instance.messageHandler.get(guild, "IMAGE-TEST"));
        return embed;
    }),
};
