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
          "https://discord.com/api/oauth2/authorize?client_id=995519159268016169&permissions=8&scope=bot+applications.commands"
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
