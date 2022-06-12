import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const serverSchema = require('../../schemas/serverSchema')
const anime = require('anime-images-api')
const API = new anime()

export default {
    name: 'kiss',
    names: ['kiss', 'smooch'],
    category: 'Fun',
    description: 'Kisses any specified user',
    expectedArgs: '<user>',
    minArgs: 1,
    slash: 'both',
    testOnly: true,
    options: [{
        name: "user",
        description: "The user to kiss",
        required: true,
        type: ApplicationCommandOptionTypes.USER
    }],
    callback: async ({ interaction, message, member, guild, args }) => {
        const check = await serverSchema.findOne({
            _id: guild?.id
        })
        let { image } = await API.sfw.kiss()
        if(check && check.animeToggle == "false") {
            image = "https://cdn.discordapp.com/attachments/985350444626882590/985350575287861328/bar_kiss.gif"
        }
        if(interaction) {
            const targetMember = interaction.options.getUser('user')!
            const embed = new MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(image)
            .setDescription(`
            <@${member.id}>
            
            ***KISSES***
            
            <@${targetMember.id}>`)
            return embed
        } else {
            if(!args[0].startsWith("<@") && !args[0].startsWith("!")) return "You must specify someone to hug"
            if(!args[0].endsWith(">")) return "You must specify someone to hug"
            const embed = new MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(image)
            .setDescription(`
            <@${member.id}>
            
            ***KISSES***
            
            ${args[0]}`)
            return embed
        }
    },
} as ICommand