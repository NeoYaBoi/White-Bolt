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
    name: 'visible',
    names: ['visible', 'vis'],
    category: 'Profile',
    description: 'Changes whether your profile is visible to other users.',
    expectedArgs: '<toggle>',
    maxArgs: 1,
    slash: 'both',
    cooldown: '10m',
    options: [{
            name: "toggle",
            description: "The toggle you would like to set.",
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            required: false,
            choices: [
                {
                    name: "On",
                    value: "true"
                },
                {
                    name: "Off",
                    value: "false"
                }
            ]
        }],
    callback: ({ interaction, message, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let toggle = interaction.options.getString('toggle');
        const userResult = yield profileSchema.findOne({ _id: user.id });
        if (!toggle) {
            if (!userResult || !userResult.visible || userResult.visible == 'false') {
                return `Visible on your profile is set to false`;
            }
            else {
                return `Visible on your profile is set to true`;
            }
        }
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            visible: toggle
        }, {
            upsert: true
        });
        return `Visible on your profile is now set to **${toggle}**`;
    }),
};
