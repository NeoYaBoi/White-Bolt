import { Client, MessageEmbed, TextChannel } from "discord.js";
const welcomeSchema = require("../schemas/welcomeSchema");
const serverSchema = require("../schemas/serverSchema")
export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    const { guild, id } = member;
    const guildResult = await welcomeSchema.findOne({ _id: guild.id });
    const serverResult = await serverSchema.findOne({ _id: guild.id });
    if (!guildResult) return;
    const channel = guild.channels.cache.get(
      guildResult.welcomeChannel
    ) as TextChannel;
    if (!channel) return;
    if (serverResult) {
      if(serverResult.welcomeToggle == "false") return
    }
    let formalDesc = guildResult.embedDesc.replace(/{@}/g, `<@${id}>`);
    let finalDesc = formalDesc.replace(/{name}/g, member.user.username);
    let formalTitle = guildResult.embedTitle.replace(
      /{@}/g,
      `{cannot ping users in titles}`
    );
    let finalTitle = formalTitle.replace(/{name}/g, member.user.username);
    const embed = new MessageEmbed()
      .setTitle(finalTitle)
      .setDescription(finalDesc)
      .setColor("WHITE")
      .setThumbnail(
        member.user.displayAvatarURL({ format: "jpg", dynamic: true })
      )
      .setImage("https://cdn.discordapp.com/attachments/985350444626882590/990175224270028840/welcum.png");
    channel.send({ embeds: [embed] });
  });
};
const config = {
  displayName: "Welcome",
  dbName: "Welcomes",
};
export { config };