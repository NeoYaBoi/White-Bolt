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
    name: 'sexuality',
    category: 'Profile',
    description: 'Changes your specified sexuality for your profile. (SOC)',
    expectedArgs: '<sexuality>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    options: [
        {
            name: "sexuality",
            description: "The sexuality you would like to set.",
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            required: true,
            choices: [
                {
                    name: "Straight",
                    value: "Straight"
                },
                {
                    name: "Gay",
                    value: "Gay"
                },
                {
                    name: "Lesbian",
                    value: "Lesbian"
                },
                {
                    name: "Bisexual",
                    value: "Bisexual"
                },
                {
                    name: "Omnisexual",
                    value: "Omnisexual"
                },
                {
                    name: "Pansexual",
                    value: "Pansexual"
                },
                {
                    name: "Asexual",
                    value: "Asexual"
                },
                {
                    name: "Other",
                    value: "Other"
                }
            ]
        }
    ],
    callback: ({ interaction, message, user }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message) {
            return {
                custom: true,
                content: "This is a slash only command.",
                ephemeral: true,
            };
        }
        let sexuality = interaction.options.getString('sexuality');
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            sexuality: sexuality
        }, {
            upsert: true
        });
        return `Your sexuality is now set to **${sexuality}**`;
    }),
};
