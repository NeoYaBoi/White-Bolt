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
const profileSchema = require('../../../schemas/profileSchema');
const { specialCmdLevel } = require('../../../config.json');
exports.default = {
    name: 'thumbnail',
    names: ['thumbnail', 'thumb'],
    category: 'Profile',
    description: 'Changes the thumbnail on your profile',
    expectedArgs: '<thumbnail>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    expectedArgsTypes: ['STRING'],
    callback: ({ interaction, message, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let thumbnail = message ? args[0] : interaction.options.getString('thumbnail');
        if (!thumbnail.startsWith('http://') && !thumbnail.startsWith('https://')) {
            return {
                custom: true,
                content: "This is not a valid thumbnail.",
                ephemeral: true,
            };
        }
        const profileResult = yield profileSchema.findOne({ _id: user.id });
        if (!profileResult || (profileResult.level && profileResult.level <= specialCmdLevel)) {
            return {
                custom: true,
                content: "You are not of the required level.",
                ephemeral: true,
            };
        }
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            thumbnail: thumbnail
        }, {
            upsert: true
        });
        let embed = new discord_js_1.MessageEmbed()
            .setTitle("New Thumbnail")
            .setDescription("Your new thumbnail has been set to")
            .setImage(thumbnail)
            .setColor('WHITE');
        return embed;
    }),
};
