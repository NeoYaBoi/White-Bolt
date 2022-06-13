import { ICommand } from "wokcommands";
import {
  MessageActionRow,
  MessageButton,
} from "discord.js";

export default {
  name: "invite",
  category: "Utility",
  description: "Gives the bot invite link",
  slash: "both",

  callback: async ({ interaction, message, }) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=800106088720629790&permissions=8&scope=bot%20applications.commands"
        )
        .setStyle("LINK")
    );
    return {
        custom: true,
        content: "Here is the link to invite me to your server",
        components: [row]
    }
  },
} as ICommand;
