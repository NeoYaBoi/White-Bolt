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
const userSchema = require("../../schemas/userSchema");
exports.default = {
    name: "profile",
    names: ["profile", "pf"],
    category: "Profile",
    description: "Gets a users profile.",
    expectedArgs: "<user>",
    minArgs: 0,
    maxArgs: 1,
    slash: "both",
    testOnly: true,
    guildOnly: true,
    expectedArgsTypes: ["USER"],
    callback: ({ interaction, message, member, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let use;
        if (message && args[0] && ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first())) {
            use = message.mentions.members.first();
        }
        else if (interaction && interaction.options.data.length == 1) {
            interaction.options.getMember("user");
        }
        else {
            use = member;
        }
        let profile = yield profileSchema.findOne({ _id: use === null || use === void 0 ? void 0 : use.id });
        if (profile && profile.visible == "false" && (member === null || member === void 0 ? void 0 : member.id) != profile._id) {
            return {
                custom: true,
                content: "This user has disabled there profile visibility.",
                ephemeral: true,
            };
        }
        const embed = new discord_js_1.MessageEmbed();
        if (use) {
            embed.setAuthor(use === null || use === void 0 ? void 0 : use.displayName, use.displayAvatarURL({ format: "jpg", dynamic: true }));
        }
        embed
            .setDescription(`This is ${use === null || use === void 0 ? void 0 : use.displayName}'s White Bolt profile`)
            .setColor("WHITE")
            .addFields([
            {
                name: "\u200b",
                value: "**Discord**"
            },
            {
                name: "<:3815squareping:998516276446117948> Ping",
                value: `<@${member.id}>`,
                inline: true
            },
            {
                name: "📛 Nickname",
                value: (use === null || use === void 0 ? void 0 : use.nickname) || "N/A",
                inline: true,
            },
            {
                name: "🆔 ID",
                value: `${use === null || use === void 0 ? void 0 : use.id}`,
                inline: true
            },
            {
                name: "\u200b",
                value: "**Custom**"
            },
            {
                name: "😐 Name",
                value: profile ? profile.name : "N/A",
                inline: true,
            },
            {
                name: "🧓 Age",
                value: profile ? profile.age + " years" : "N/A",
                inline: true
            },
            {
                name: "<:heto:998447620034928670> Sexuality",
                value: profile ? profile.sexuality : "N/A",
                inline: true
            },
            {
                name: "Gender",
                value: profile ? profile.gender : "N/A",
                inline: true
            }
        ]);
        if (profile && profile.banner) {
            embed.setImage(profile.banner);
        }
        if (profile && profile.thumbnail) {
            embed.setThumbnail(profile.thumbnail);
        }
        if (profile && profile.embedColor) {
            if (profile.embedColor == "BLUE") {
                embed.setColor("BLUE");
            }
            else if (profile.embedColor == "GREEN") {
                embed.setColor("GREEN");
            }
            else if (profile.embedColor == "PURPLE") {
                embed.setColor("PURPLE");
            }
            else if (profile.embedColor == "DARK_VIVID_PINK") {
                embed.setColor("DARK_VIVID_PINK");
            }
            else if (profile.embedColor == "BLACK") {
                embed.setColor("DARK_BUT_NOT_BLACK");
            }
            else if (profile.embedColor == "RED") {
                embed.setColor("RED");
            }
            else if (profile.embedColor == "YELLOW") {
                embed.setColor("YELLOW");
            }
            else if (profile.embedColor == "RANDOM") {
                embed.setColor("RANDOM");
            }
        }
        return embed;
    }),
};
