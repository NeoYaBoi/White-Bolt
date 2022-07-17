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
    name: 'manage',
    category: 'Owner',
    description: 'Manages a users profile (SOC)',
    expectedArgs: '<manage> <user> <true/false>',
    minArgs: 2,
    slash: 'both',
    ownerOnly: true,
    hidden: true,
    options: [{
            name: "manage",
            description: "The manage option you would like to choose.",
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            required: true,
            choices: [{
                    name: "agelock",
                    value: "AGELOCK"
                }]
        }, {
            name: "user",
            description: "The user you would like to manage.",
            type: 6 /* ApplicationCommandOptionTypes.USER */,
            required: true,
        }, {
            name: "toggle",
            description: "The toggle for the manage you selected",
            type: "STRING",
            required: true,
            choices: [{
                    name: "true",
                    value: "true"
                }, {
                    name: "false",
                    value: "false"
                }]
        }],
    callback: ({ interaction, message }) => __awaiter(void 0, void 0, void 0, function* () {
        if (message) {
            return {
                custom: true,
                content: "This is a slash only command",
                ephemeral: true,
            };
        }
        let manage = interaction.options.getString('manage');
        let toggle = interaction.options.getString('toggle');
        let user = interaction.options.getUser('user');
        if (manage == "AGELOCK") {
            yield profileSchema.findOneAndUpdate({
                _id: user.id
            }, {
                ageLock: toggle
            }, {
                upsert: true
            });
            return `${user.username}'s agelock has been set to ${toggle}`;
        }
    }),
};
