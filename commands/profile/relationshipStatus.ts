import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const profileSchema = require('../../schemas/profileSchema')

export default {
  name: "status",
  category: "Profile",
  description: "Changes your relationship status on your profile. (SOC)",
  expectedArgs: "<status>",
  minArgs: 1,
  slash: "both",
  cooldown: '1d',
  options: [
    {
      name: "status",
      description: "Your new relationship status",
      type: ApplicationCommandOptionTypes.STRING,
      required: true,
      choices: [
        {
          name: "Single",
          value: "Single",
        },
        {
          name: "Taken",
          value: "Taken",
        },
        {
          name: "Crushing",
          value: "Crushing",
        },
        {
          name: "Complicated",
          value: "Complicated",
        },
      ],
    },
  ],
  callback: async ({ interaction, message, user }) => {
    if (message) {
      return {
        custom: true,
        content: "This is a slash only command.",
        ephemeral: true,
      };
    }
    let status = interaction.options.getString('status')
    await profileSchema.findOneAndUpdate(
        {
            _id: user.id
        },
        {
            status: status
        },
        {
            upsert: true
        }
    )
    return `Your new relationship status has been set to ${status}`
  },
} as ICommand;
