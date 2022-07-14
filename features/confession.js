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
exports.config = void 0;
const discord_js_1 = require("discord.js");
const serverSchema = require("../schemas/confessionGuildSchema");
const confessionSchema = require("../schemas/confessionSchema");
const toggler = require("../schemas/serverSchema");
exports.default = (client) => {
    client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.guild == null)
            return;
        if (message.author.bot)
            return;
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const serverResult = yield serverSchema.findOne({
                _id: (_a = message === null || message === void 0 ? void 0 : message.guild) === null || _a === void 0 ? void 0 : _a.id,
            });
            if (!serverResult || !serverResult.confessHere)
                return;
            if (message.channel.id != serverResult.confessHere)
                return;
            const checker = yield toggler.findOne({ _id: (_b = message === null || message === void 0 ? void 0 : message.guild) === null || _b === void 0 ? void 0 : _b.id });
            if (checker) {
                if (checker.confessionToggle == "false")
                    return;
            }
            if (message.deletable) {
                message.delete();
            }
            else {
                message.reply("I cannot delete this message");
            }
            let channel = yield ((_d = (_c = message === null || message === void 0 ? void 0 : message.member) === null || _c === void 0 ? void 0 : _c.guild) === null || _d === void 0 ? void 0 : _d.channels.fetch(serverResult.confessSend));
            if (!channel)
                return;
            yield confessionSchema.findOneAndUpdate({
                _id: serverResult.confessions + 1,
            }, {
                author: (_e = message === null || message === void 0 ? void 0 : message.member) === null || _e === void 0 ? void 0 : _e.id,
                confession: message === null || message === void 0 ? void 0 : message.content,
            }, {
                upsert: true,
            });
            yield serverSchema.findOneAndUpdate({
                _id: (_f = message.guild) === null || _f === void 0 ? void 0 : _f.id
            }, {
                confessions: serverResult.confessions + 1
            }, {
                upsert: true
            });
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`Confession ${serverResult.confessions + 1}`)
                .setDescription(message === null || message === void 0 ? void 0 : message.content)
                .setColor("DARK_RED");
            channel.send({ embeds: [embed] });
        }), 500);
    }));
};
const config = {
    displayName: "Confession",
    dbName: "Confession",
};
exports.config = config;
