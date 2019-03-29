const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const db = require("sqlite");

class Dev extends Command {
    constructor(client) {
      super({
        name: 'dev',
        description: 'This command is used for the developers of the client.',
        usage: `${client.prefix}dev`,
        category: 'staff',
        enabled: true,
        ownerOnly: true,
        modOnly: false,
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
            if(!args[2]) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to input an option!\n\n\**Options:**\n\`<{yes, no}>\` to set the verification for a user.`
            }});
            
            if(!user) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to mention a member to set the verification. Please try again!`
            }});
            
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {
                db.run(`UPDATE scrimCopsUser SET user_verified="${args[2][0].toUpperCase() + args[2].slice(1)}" WHERE user_id="${user.id}"`).then(row => {
                    return message.channel.send({embed: {
                      color: this.client.color.green,
                      description: `Succesfully updated **${user}'s** verification to **${args[2][0].toUpperCase() + args[2].slice(1)}**!`
                    }});              
                });
              }
            });
            return;
          } else if(args[1] === 'rank') {
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {

              }
            });
            return;
          } else if(args[1] === 'staff') {
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {

              }
            });
            return;
          } else if(args[1] === 'beta') {
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {

              }
            });
            return;
          } else {
            return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to put in an option!\n\n**Options:**\n\`verify <{yes, no}> <@user>\``
            }});
          }
          return;
        } else {
          return message.channel.send({embed: {
            color: this.client.color.red,
            description: `You forgot to put in an option!\n\n**Options:**\n\`set\``
          }});
        }
    }
}

module.exports = Dev;