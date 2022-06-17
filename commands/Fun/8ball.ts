import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
var ballAwns = [
  //pos
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  //mid
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  //neg
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];

export default {
  name: "8ball",
  category: "Fun",
  description: "Answers all your dying questions,",
  expectedArgs: "<8ball>",
  guildOnly: true,
  minArgs: 1,
  slash: "both",
  expectedArgsTypes: ["STRING"],
  callback: ({ interaction, message, prefix, user, member, guild, instance }) => {
    let content = message
      ? message.content.replace(`${prefix}8ball`, ``)
      : interaction.options.getString("8ball");
    let randomAnswers = Math.floor(Math.random() * ballAwns.length);
    const embed = new MessageEmbed()
      .setAuthor(
        `${member.displayName} | 8Ball`,
        user.displayAvatarURL({ size: 1024, dynamic: true })
      )
      .setDescription(`The sacred 8ball has decided that the answer to your question is: **${ballAwns[randomAnswers]}**`)
      .setColor("WHITE")
      .setThumbnail("https://cdn.discordapp.com/attachments/985350444626882590/986586534956372018/8bal.jpg")
      .setFooter(`Question Asked: ${content}`)
      .setFooter(instance.messageHandler.get(guild, "IMAGE-TEST"));
    return embed
  },
} as ICommand;