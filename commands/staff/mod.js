const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const db = require("sqlite");

class Mod extends Command {
    constructor(client) {
      super({
        name: 'mod',
        description: 'This command is used for moderators of the client.',
        usage: `${client.prefix}mod`,
        category: 'staff',
        enabled: true,
        ownerOnly: true,
        modOnly: true,
        beta: false
      });
    
    this.client = client;
    }
  
    async run(message, args) {
        const path = require('path');
        const dbPath = path.resolve(__dirname, '../../dataScrimCops.sqlite');
        await db.open(dbPath);
      
        const user = message.mentions.users.first();
      
        if(args[0] === 'set') {
          if(args[1] === 'verify') {
               
          } else {
            return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to put in an option!\n\n**Options:**\n\`verify <{yes, no}> <@user>\`\n\`rank <{pro, staff, moderator, administrator, developer}> <@user>\`\n\`staff <{yes, no}> <@user>\`\n\`beta <{yes, no}> <@user>\``
            }});
          }
        } else {
          return message.channel.send({embed: {
            color: this.client.color.red,
            description: `You forgot to put in an option!\n\n**Options:**\n\`set\``
          }});
        }
    }
}

module.exports = Mod;