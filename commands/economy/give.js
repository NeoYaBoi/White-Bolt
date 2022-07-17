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
const config_json_1 = require("../../config.json");
const userSchema = require("../../schemas/userSchema");
exports.default = {
    name: "give",
    aliases: ["give", "g"],
    category: "Economy",
    description: "Gives money to a specified user",
    expectedArgs: "<amount> <user>",
    minArgs: 2,
    slash: "both",
    guildOnly: true,
    expectedArgsTypes: ["NUMBER", "USER"],
    callback: ({ interaction, message, args, member }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let user = message
            ? (_b = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) === null || _b === void 0 ? void 0 : _b.user
            : interaction.options.getUser("user");
        let amount = message
            ? parseFloat(args[0])
            : interaction.options.getNumber("amount");
        if (isNaN(amount))
            return {
                custom: true,
                content: "You must specify a valid amount.",
                ephemeral: true,
            };
        if (member.id == (user === null || user === void 0 ? void 0 : user.id))
            return {
                custom: true,
                content: "You cannot give money to yourself.",
                ephemeral: true,
            };
        const senderResult = yield userSchema.findOne({ _id: member.id });
        const receiverResult = yield userSchema.findOne({ _id: user === null || user === void 0 ? void 0 : user.id });
        let toGive = amount;
        let sedToSet;
        let recToSet;
        //checking if the sender is in the database
        if (!senderResult || !senderResult.money) {
            if (amount >= 1000)
                return {
                    custom: true,
                    content: "You do not have enough money",
                    ephemeral: true,
                };
            sedToSet = 1000 - amount;
        }
        else {
            if (amount >= senderResult.money)
                return {
                    custom: true,
                    content: "You do not have enough money",
                    ephemeral: true,
                };
            sedToSet = senderResult.money - amount;
        }
        //checking if receiver is in database or not
        if (!receiverResult || !receiverResult.money) {
            recToSet = 1000 + amount;
        }
        else {
            recToSet = receiverResult.money + amount;
        }
        //setting sender money amount
        yield userSchema.findOneAndUpdate({
            _id: member.id,
        }, {
            money: sedToSet,
        }, {
            upsert: true,
        });
        //setting receiver money amount
        yield userSchema.findOneAndUpdate({
            _id: user === null || user === void 0 ? void 0 : user.id,
        }, {
            money: recToSet,
        }, {
            upsert: true,
        });
        //returning content
        return `You gave ${amount} ${config_json_1.currency} to ${user === null || user === void 0 ? void 0 : user.username}`;
    }),
};
