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
const welcomeSchema = require("../../schemas/welcomeSchema");
exports.default = {
    name: "welcome",
    category: "Configuration",
    description: "Changes/sets the current welcome channel in this guild. (SOC)",
    expectedArgs: "<channel> <embed-title> <embed-description>",
    minArgs: 3,
    slash: "both",
    guildOnly: true,
    permissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "channel",
            description: "The channel you would like your welcome message to be sent to.",
            required: true,
            type: 7 /* ApplicationCommandOptionTypes.CHANNEL */,
        },
        {
            name: "embed-title",
            description: "The title of the embed that will be sent when someone joins.",
            required: true,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
        },
        {
            name: "embed-description",
            description: "Description. ({@} = user ping, {name} = username)",
            required: true,
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
        },
    ],
    callback: ({ interaction, message, guild, member }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message)
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
            };
        let channel = interaction.options.getChannel("channel");
        let title = interaction.options.getString("embed-title");
        let desc = interaction.options.getString("embed-description");
        if ((channel === null || channel === void 0 ? void 0 : channel.type) != "GUILD_TEXT")
            return {
                custom: true,
                content: "This is not a text channel.",
                ephemeral: true,
            };
        yield welcomeSchema.findOneAndUpdate({
            _id: guild === null || guild === void 0 ? void 0 : guild.id,
        }, {
            welcomeChannel: channel === null || channel === void 0 ? void 0 : channel.id,
            embedTitle: title,
            embedDesc: desc,
        }, {
            upsert: true,
        });
        return `The welcome channel has been set to ${channel === null || channel === void 0 ? void 0 : channel.name}.`;
    }),
};
