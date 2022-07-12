import { Client, MessageEmbed, TextChannel } from "discord.js";
const serverSchema = require("../schemas/confessionGuildSchema");
const confessionSchema = require("../schemas/confessionSchema");
const toggler = require("../schemas/serverSchema");
export default (client: Client) => {
  client.on("message", async (message) => {
    if (message.content.toLocaleLowerCase().includes("cheese")) {
      try {
        message.react("🧀");
      } catch {
        return;
      }
    }
  });
};
const config = {
  displayName: "Cheese",
  dbName: "Cheese",
};
export { config };
