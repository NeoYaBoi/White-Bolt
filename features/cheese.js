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
exports.config = void 0;
const serverSchema = require("../schemas/confessionGuildSchema");
const confessionSchema = require("../schemas/confessionSchema");
const toggler = require("../schemas/serverSchema");
exports.default = (client) => {
    client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.content.toLocaleLowerCase().includes("cheese")) {
            try {
                message.react("🧀");
            }
            catch (_a) {
                return;
            }
        }
    }));
};
const config = {
    displayName: "Cheese",
    dbName: "Cheese",
};
exports.config = config;
