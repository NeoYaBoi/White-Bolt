"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version = require('../../package.json');
exports.default = {
    name: 'version',
    names: ['version', 'update'],
    category: 'Utility',
    description: 'Gives the current version for the bot',
    slash: 'both',
    callback: ({ interaction, message }) => {
        return `The current version is **${version.version}**`;
    },
};
