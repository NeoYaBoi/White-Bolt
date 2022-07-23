"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'permcheck',
    names: ['permcheck', 'perms', 'check'],
    category: 'Config',
    description: 'Checks that the bot has all required permissions.',
    slash: 'both',
    testOnly: true,
    permissions: ['ADMINISTRATOR'],
    callback: ({ interaction, message, guild }) => {
        return `Coming Soon`;
    },
};
