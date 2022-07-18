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
    name: 'gender',
    category: 'Profile',
    description: 'Changes your pofile gender',
    expectedArgs: '<gender>',
    minArgs: 1,
    slash: 'both',
    cooldown: '1d',
    options: [{
            name: 'gender',
            description: 'The desired gender.',
            type: 3 /* ApplicationCommandOptionTypes.STRING */,
            required: true
        }],
    callback: ({ interaction, message, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let gender = message ? args[0] : interaction.options.getString('gender');
        if ((gender === null || gender === void 0 ? void 0 : gender.length) >= 15) {
            return {
                custom: true,
                content: "Your gender must be under 15 characters.",
                ephemeral: true,
            };
        }
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            gender: gender
        }, {
            upsert: true
        });
        return `Your new gender has been set to **${gender}**`;
    }),
};
