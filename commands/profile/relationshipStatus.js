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
const profileSchema = require('../../schemas/profileSchema');
exports.default = {
    name: "status",
    category: "Profile",
    description: "Changes your relationship status on your profile. (SOC)",
    expectedArgs: "<status>",
    minArgs: 1,
    slash: "both",
    cooldown: '1d',
    options: [
        {
            name: "status",
            description: "Your new relationship status",
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            required: true,
            choices: [
                {
                    name: "Single",
                    value: "Single",
                },
                {
                    name: "Taken",
                    value: "Taken",
                },
                {
                    name: "Crushing",
                    value: "Crushing",
                },
                {
                    name: "Complicated",
                    value: "Complicated",
                },
            ],
        },
    ],
    callback: ({ interaction, message, user }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message) {
            return {
                custom: true,
                content: "This is a slash only command.",
                ephemeral: true,
            };
        }
        let status = interaction.options.getString('status');
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            status: status
        }, {
            upsert: true
        });
        return `Your new relationship status has been set to ${status}`;
    }),
};
