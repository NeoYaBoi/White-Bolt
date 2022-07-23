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
    name: 'name',
    category: 'Profile',
    description: 'Changes your preferred name for your profile.',
    expectedArgs: '<name>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    expectedArgsTypes: ['STRING'],
    callback: ({ interaction, message, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let name = message ? args[0] : interaction.options.getString('name');
        if ((name === null || name === void 0 ? void 0 : name.length) >= 15) {
            return {
                custom: true,
                content: "Your name must be under 15 characters.",
                ephemeral: true,
            };
        }
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            name: name
        }, {
            upsert: true
        });
        return `Your new preferred name is set to **${name}**`;
    }),
};
