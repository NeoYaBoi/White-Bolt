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
const profileSchema = require("../../schemas/profileSchema");
exports.default = {
    name: "banner",
    category: "Profile",
    description: "Changes the banner on your profile.",
    expectedArgs: "<banner>",
    minArgs: 1,
    slash: "both",
    expectedArgsTypes: ["STRING"],
    callback: ({ interaction, message, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let banner = message ? args[0] : interaction.options.getString("banner");
        if (!banner.startsWith('http://') && !banner.startsWith('https://')) {
            return {
                custom: true,
                content: "This is not a valid banner",
                ephemeral: true,
            };
        }
        yield profileSchema.findOneAndUpdate({
            _id: user.id,
        }, {
            banner: banner,
        }, {
            upsert: true,
        });
        let embed = new discord_js_1.MessageEmbed()
            .setTitle("Banner")
            .setDescription(`Your new banner has been set to`)
            .setColor("WHITE")
            .setImage(banner);
        return embed;
    }),
};
