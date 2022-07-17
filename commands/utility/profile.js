"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'profile',
    names: ['profile', 'pf'],
    category: 'Utility',
    description: 'Gets a users profile',
    expectedArgs: '<user>',
    minArgs: 0,
    maxArgs: 1,
    slash: 'both',
    testOnly: true,
    expectedArgsTypes: ["USER"],
    callback: ({ interaction, message }) => {
    },
};
