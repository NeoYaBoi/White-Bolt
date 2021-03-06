import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
const serverSchema = require('../../schemas/serverSchema')
const anime = require('anime-images-api')
const API = new anime()

export default {
    name: 'hug',
    aliases: ["hug", "cuddle"],
    category: 'Fun',
    description: 'Hugs any specified user',
    expectedArgs: '<user>',
    minArgs: 1,
    slash: 'both',
    guildOnly: true,
    cooldown: '5s',
    options: [{
        name: 'user',
        description: 'A user to hug',
        required: true,
        type: ApplicationCommandOptionTypes.USER
    }],

    callback: async ({ interaction, message, args, member, guild}) => {
        const check = await serverSchema.findOne({
            _id: guild?.id
        })
        let { image } = await API.sfw.hug()
        if(check && check.animeToggle == "false") {
            image = "https://cdn.discordapp.com/attachments/985350444626882590/985350958928257085/unknown.png"
        }
        if(interaction) {
            const targetMember = interaction.options.getUser('user')!
            const embed = new MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(image)
            .setDescription(`
            <@${member.id}>
            
            ***HUGS***
            
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
            
            ***HUGS***
            
            ${args[0]}`)
            return embed
        }
    },
} as ICommand