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
function number_test(n) {
    var result = n - Math.floor(n) !== 0;
    if (result)
        return "true";
    else
        return "false";
}
exports.default = {
    name: "age",
    names: ["age"],
    category: "Profile",
    description: "Changes your current set age.",
    expectedArgs: "<age>",
    minArgs: 1,
    slash: "both",
    expectedArgsTypes: ["NUMBER"],
    callback: ({ interaction, message, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let age;
        if (message) {
            if (args[0].includes(".") ||
                isNaN(parseFloat(args[0])) ||
                args[0] == "0") {
                return "You must specify a valid number.";
            }
            age = args[0];
        }
        else {
            const numTest = number_test(interaction.options.getNumber("age"));
            if (numTest == "true" || interaction.options.getNumber("age") == 0)
                return {
                    custom: true,
                    content: "You must specify a valid number.",
                    ephemeral: true,
                };
            const negOrNot = Math.sign(interaction.options.getNumber("age"));
            if (negOrNot != 1)
                return {
                    custom: true,
                    content: "You must specify a valid number.",
                    ephemeral: true,
                };
            age = interaction.options.getNumber("age");
        }
        const userResult = yield profileSchema.findOne({ _id: user.id });
        if (userResult && userResult.ageLock == 'true') {
            return {
                custom: true,
                content: "Your age has been locked. Please contact a bot admin to unlock it.",
                ephemeral: true,
            };
        }
        yield profileSchema.findOneAndUpdate({
            _id: user.id
        }, {
            age: age.toString(),
            ageLock: "true"
        }, {
            upsert: true
        });
        return "New age set!";
    }),
};
