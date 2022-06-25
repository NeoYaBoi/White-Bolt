import { Client, MessageEmbed, TextChannel } from "discord.js";
const serverSchema = require("../schemas/confessionGuildSchema");
const confessionSchema = require("../schemas/confessionSchema");
const checker = require("../schemas/serverSchema")
export default (client: Client) => {
  client.on("message", async (message) => {
    if (message.guild == null) return;
    if (message.author.bot) return;
    setTimeout(async () => {
      const serverResult = await serverSchema.findOne({
        _id: message?.guild?.id,
      });
      if (!serverResult || !serverResult.confessHere) return;
      if (message.channel.id != serverResult.confessHere) return;
      if(checker) {
        if(checker.confessionToggle == "false") return
      }
      if (message.deletable) {
        message.delete();
      } else {
        message.reply("I cannot delete this message");
      }
      let channel = await message?.member?.guild?.channels.fetch(
        serverResult.confessSend
      ) as TextChannel;
      if (!channel) return
      await confessionSchema.findOneAndUpdate(
        {
          _id: serverResult.confessions + 1,
        },
        {
          author: message?.member?.id,
          confession: message?.content,
        },
        {
          upsert: true,
        }
      );
      await serverSchema.findOneAndUpdate(
        {
            _id: message.guild?.id
        },
        {
            confessions: serverResult.confessions + 1
        }, 
        {
            upsert: true
        }
      )
      const embed = new MessageEmbed()
        .setTitle(`Confession ${serverResult.confessions + 1}`)
        .setDescription(message?.content)
        .setColor("DARK_RED");
      channel.send({ embeds: [embed] });
    }, 500);
  });
};
const config = {
  displayName: "Confession",
  dbName: "Confession",
};
export { config };