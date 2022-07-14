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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const { request } = require("undici");
exports.default = {
    name: "cat",
    aliases: ["cat", "kitty"],
    category: "Fun",
    description: "Gives a random cat image. (LRT)",
    cooldown: '5s',
    slash: "both",
    callback: ({ interaction, member, message, instance, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction) {
            interaction.deferReply();
        }
        function getJSONResponse(body) {
            var body_1, body_1_1;
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function* () {
                let fullBody = "";
                try {
                    for (body_1 = __asyncValues(body); body_1_1 = yield body_1.next(), !body_1_1.done;) {
                        const data = body_1_1.value;
                        fullBody += data.toString();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (body_1_1 && !body_1_1.done && (_a = body_1.return)) yield _a.call(body_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return JSON.parse(fullBody);
            });
        }
        const catResult = yield request("https://aws.random.cat/meow");
        const { file } = yield getJSONResponse(catResult.body);
        if (message) {
            message.reply({ files: [file], content: "Here is your cat image." });
        }
        else {
            interaction.editReply({
                files: [file],
                content: "Here is your cat image.",
            });
        }
    }),
};
