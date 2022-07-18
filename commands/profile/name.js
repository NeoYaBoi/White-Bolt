"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'name',
    category: 'Profile',
    description: 'Changes your preferred name for your profile.',
    expectedArgs: '<name>',
    minArgs: 1,
    slash: 'both',
    testOnly: true,
    expectedArgsTypes: ['STRING'],
    callback: ({ interaction, message }) => {
    },
};
