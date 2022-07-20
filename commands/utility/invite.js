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
exports.default = {
    name: "invite",
    category: "Utility",
    description: "Gives the bot invite link",
    slash: "both",
    callback: ({ interaction, message, }) => __awaiter(void 0, void 0, void 0, function* () {
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setLabel("Invite")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=995519159268016169&permissions=8&scope=bot+applications.commands")
            .setStyle("LINK"));
        return {
            custom: true,
            content: "Here is the link to invite me to your server",
            components: [row]
        };
    }),
};
