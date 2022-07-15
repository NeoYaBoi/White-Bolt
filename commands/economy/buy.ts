import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import {
  ApplicationCommandOptionTypes,
  MembershipStates,
} from "discord.js/typings/enums";
import { levels } from "../../items.json";
const itemSchema = require("../../schemas/itemSchema");
const userSchema = require("../../schemas/userSchema");

export default {
  name: "buy",
  category: "Economy",
  description: "Buys specific items. (SOC)",
  expectedArgs: "<item>",
  minArgs: 1,
  slash: "both",
  guildOnly: true,
  options: [
    {
      name: "item",
      description: "The item you would like to purchase",
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {
          name: "Level 1",
          value: "LEVELONE",
        },
        {
          name: "Level 2",
          value: "LEVELTWO",
        },
        {
          name: "Level 3",
          value: "LEVELTHREE",
        },
        {
          name: "Level 4",
          value: "LEVELFOUR",
        },
        {
          name: "Level 5",
          value: "LEVELFIVE",
        },
      ],
    },
  ],
  callback: async ({ interaction, message, member }) => {
    if (message) {
      return {
        custom: true,
        content: "This is a slash only command",
        ephemeral: true,
      };
    }
    let item = interaction.options.getString("item")!;
    const userResult = await userSchema.findOne({ _id: member.id });
    if (!userResult || !userResult.money) {
      return {
        custom: true,
        content: "You do not have any money.",
        ephemeral: true,
      };
    }

    let embed = new MessageEmbed();

    //levels
    if (item.startsWith("LEVEL")) {
      let level = 0;
      let toDeduct = 0;
      let levelB = "nop";
      if (item == "LEVELONE") {
        if(userResult.level) {
          return {
            custom: true,
            content: "You cannot buy this level",
            ephemeral: true,
          };
        }
        level = 1;
        toDeduct = levels.one.price;
        levelB = "<:lev1:997033287644086302>";
        embed
          .setAuthor(`${member.displayName} | Level 1`)
          .setDescription(
            `Please congratulate ${
              member.displayName
            } for reaching **Level 1**. \n You now get access to our [Level 1 Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997048972453629983/level_1.png"
          )
          .setColor("#644223");
      } else if (item == "LEVELTWO") {
        if(userResult.level && userResult.level == 1) {} else {
          return {
            custom: true,
            content: "You cannot buy this level",
            ephemeral: true,
          };
        }
        level = 2;
        toDeduct = levels.two.price;
        levelB = "<:lev2:997033285702123590>";
        embed
          .setAuthor(`${member.displayName} | Level 2`)
          .setDescription(
            `Please congratulate ${
              member.displayName
            } for reaching **Level 2**. \n You now get access to our [Level 2 Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049363882848306/lever_2.png"
          )
          .setColor("#a7b2b9");
      } else if (item == "LEVELTHREE") {
        if(userResult.level && userResult.level == 2) {} else {
          return {
            custom: true,
            content: "You cannot buy this level",
            ephemeral: true,
          };
        }
        level = 3;
        toDeduct = levels.three.price;
        levelB = "<:lev3:997033289485398096>";
        embed
          .setAuthor(`${member.displayName} | Level 3`)
          .setDescription(
            `Please congratulate ${
              member.displayName
            } for reaching **Level 3**. \n You now get access to our [Level 3 Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049412067004456/level_3.png"
          )
          .setColor("#f2ba2d");
      } else if (item == "LEVELFOUR") {
        if(userResult.level && userResult.level == 3) {} else {
          return {
            custom: true,
            content: "You cannot buy this level",
            ephemeral: true,
          };
        }
        level = 4;
        toDeduct = levels.four.price;
        levelB = "<:lev4:997033290634641500>";
        embed
          .setAuthor(`${member.displayName} | Level 4`)
          .setDescription(
            `Please congratulate ${
              member.displayName
            } for reaching **Level 4**. \n You now get access to our [Level 4 Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049446795841607/level_4.png"
          )
          .setColor("#9b2b61");
      } else if (item == "LEVELFIVE") {
        if(userResult.level && userResult.level == 4) {} else {
          return {
            custom: true,
            content: "You cannot buy this level",
            ephemeral: true,
          };
        }
        level = 5;
        toDeduct = levels.five.price;
        levelB = "<:lev5:997033292677255188>";
        embed
          .setAuthor(`${member.displayName} | Level 5`)
          .setDescription(
            `Please congratulate ${
              member.displayName
            } for reaching **Level 5**. \n You now get access to our [Level 5 Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/995514908584189973/997049483244351579/level_5.png"
          )
          .setColor("#a084a3");
      }
      if (userResult.money <= toDeduct) {
        return {
          custom: true,
          content: "You do not have enough money.",
          ephemeral: true,
        };
      }
      await userSchema.findOneAndUpdate(
        {
          _id: member.id,
        },
        {
          money: userResult.money - toDeduct,
          level: level,
          levelbadge: levelB,
        },
        {
          upsert: true,
        }
      );
    }
    return embed
  },
} as ICommand;
