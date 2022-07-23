import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
const profileSchema = require('../../schemas/profileSchema')
function number_test(n: number) {
  var result = n - Math.floor(n) !== 0;

  if (result) return "true";
  else return "false";
}

export default {
  name: "age",
  names: ["age"],
  category: "Profile",
  description: "Changes your current set age.",
  expectedArgs: "<age>",
  minArgs: 1,
  slash: "both",
  expectedArgsTypes: ["NUMBER"],
  callback: async ({ interaction, message, args, user }) => {
    let age;
    if (message) {
      if (
        args[0].includes(".") ||
        isNaN(parseFloat(args[0])) ||
        args[0] == "0"
      ) {
        return "You must specify a valid number.";
      }
      age = args[0]
    } else {
      const numTest = number_test(interaction.options.getNumber("age")!);
      if (numTest == "true" || interaction.options.getNumber("age")! == 0)
        return {
          custom: true,
          content: "You must specify a valid number.",
          ephemeral: true,
        };
      const negOrNot = Math.sign(interaction.options.getNumber("age")!);
      if (negOrNot != 1)
        return {
          custom: true,
          content: "You must specify a valid number.",
          ephemeral: true,
        };
       age = interaction.options.getNumber("age")!
    }
    const userResult = await profileSchema.findOne({_id: user.id})
    if(userResult && userResult.ageLock == 'true') {
        return {
            custom: true,
            content: "Your age has been locked. Please contact a bot admin to unlock it.",
            ephemeral: true,
          };
    }
    await profileSchema.findOneAndUpdate(
        {
            _id: user.id
        },
        {
            age: age.toString(),
            ageLock: "true"
        },
        {
            upsert: true
        }
    )
    return `Your new age has been set to **${age}**`
  },
} as ICommand;
