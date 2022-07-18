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
const userSchema = require('../../../schemas/userSchema');
const profileSchema = require('../../../schemas/profileSchema');
const { specialCmdLevel } = require('../../../config.json');
let colors = [
    'WHITE',
    'BLUE',
    'GREEN',
    'PURPLE',
    'DARK_VIVID_PINK',
    'BLACK',
    'RED',
    'YELLOW',
    'RANDOM'
];
exports.default = {
    name: 'colour',
    names: ['colour', 'color'],
    category: 'Profile',
    description: 'Changes the colour of your profile embed. (SOC)',
    expectedArgs: '<colour>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    options: [{
            name: "colour",
            description: "The colour you would like to choose.",
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            required: true,
            choices: [
                {
                    name: "White",
                    value: "WHITE"
                },
                {
                    name: "Blue",
                    value: "BLUE"
                },
                {
                    name: "Green",
                    value: "GREEN"
                },
                {
                    name: "Purple",
                    value: "PURPLE"
                },
                {
                    name: "Dark_Vivid_Pink",
                    value: "DARK_VIVID_PINK"
                },
                {
                    name: "Black",
                    value: "BLACK"
                },
                {
                    name: "Red",
                    value: "RED"
                },
                {
                    name: "Yellow",
                    value: "YELLOW"
                },
                {
                    name: "Random",
                    value: "RANDOM"
                }
            ]
        }],
    callback: ({ interaction, message, user }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message) {
            return {
                custom: true,
                content: "This is a slash only command.",
                ephemeral: true,
            };
        }
        const userResult = yield userSchema.findOne({ _id: user.id });
        if (!userResult || !userResult.level || userResult.level != specialCmdLevel) {
            return {
                custom: true,
                content: "You are not of the required level.",
                ephemeral: true,
            };
        }
        let color = interaction.options.getString('colour');
        let RealColor = "N/A";
        colors.forEach(element => {
            if (element == color) {
                RealColor = element;
            }
        });
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            embedColor: RealColor
        }, {
            upsert: true
        });
        return `Your new embed colour was set to ${RealColor.toLowerCase()}`;
    }),
};
