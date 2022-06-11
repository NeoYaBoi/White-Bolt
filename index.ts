import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})

client.on('ready', () => {
    client.on('ready', () => {
        const dbOptions = {
            keepAlive: true
        }

        new WOKCommands(client, {
            commandsDir: path.join(__dirname, 'commands'),
            typeScript: true,
            testServers: ['984917713224859699'],
            mongoUri: process.env.MONGO
        })
            .setBotOwner(['555991737072615424'])
            .setCategorySettings([
                {
                    name: "Utility",
                    emoji: '🔨'
                }
            ])
    })

})

client.login(process.env.TOKEN)