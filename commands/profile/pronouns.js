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
const profileSchema = require("../../schemas/profileSchema");
exports.default = {
    name: "pronouns",
    category: "Profile",
    description: "Changes your pronouns on your profile",
    expectedArgs: "<pronouns>",
    minArgs: 1,
    slash: "both",
    expectedArgsTypes: ["STRING"],
    callback: ({ interaction, message, args, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let pronouns = message
            ? args[0]
            : interaction.options.getString("pronouns");
        if (!pronouns.includes("/")) {
            return {
                custom: true,
                content: "These are not valid pronouns.",
                ephemeral: true,
            };
        }
        let pronounArgs = pronouns.split("/");
        if (pronounArgs[0].length >= 5 || pronounArgs[1].length >= 5)
            return {
                custom: true,
                content: "Your pronouns are to long.",
                ephemeral: true,
            };
        if (pronounArgs[2])
            return {
                custom: true,
                content: "Your pronouns are to long.",
                ephemeral: true,
            };
        yield profileSchema.findOneAndUpdate({
            _id: user.id,
        }, {
            pronouns: pronouns,
        }, {
            upsert: true,
        });
        return `Your pronouns have now been set to **${pronouns}**`;
    }),
};
