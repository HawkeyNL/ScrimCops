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
              description: `You forgot to input an option!\n\n\**Options:**\n\`<{yes, no}>\` to set the verification boolean for a user.`
            }});
            
            if(!user) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to mention a member to set the verification boolean. Please try again!`
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
            if(!args[2]) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to input an option!\n\n\**Options:**\n\`<{pro, staff, moderator, administrator, developer}>\` to set the rank for a user.`
            }});
            
            if(!user) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to mention a member to set the rank. Please try again!`
            }});
            
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {
                db.run(`UPDATE scrimCopsUser SET user_rank="${args[2][0].toUpperCase() + args[2].slice(1)}" WHERE user_id="${user.id}"`).then(row => {
                  return message.channel.send({embed: {
                    color: this.client.color.green,
                    description: `Succesfully updated **${user}'s** rank to **${args[2][0].toUpperCase() + args[2].slice(1)}**!`
                  }}); 
                });
              }
            });
            return;
          } else if(args[1] === 'staff') {
            if(!args[2]) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to input an option!\n\n\**Options:**\n\`<{yes, no}>\` to set the staff boolean for a user.`
            }});
            
            if(!user) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to mention a member to set the staff boolean. Please try again!`
            }});
            
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {
                db.run(`UPDATE scrimCopsUser SET user_is_staff="${args[2][0].toUpperCase() + args[2].slice(1)}" WHERE user_id="${user.id}"`).then(row => {
                  return message.channel.send({embed: {
                    color: this.client.color.green,
                    description: `Succesfully updated **${user}'s** staff to **${args[2][0].toUpperCase() + args[2].slice(1)}**!`
                  }}); 
                });
              }
            });
            return;
          } else if(args[1] === 'beta') {
            if(!args[2]) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to input an option!\n\n\**Options:**\n\`<{yes, no}>\` to set the beta boolean for a user.`
            }});
            
            if(!user) return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to mention a member to set the beta boolean. Please try again!`
            }});
            
            db.get(`SELECT user_id FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
              if(!row) {
                return message.channel.send({embed: {
                  color: this.client.color.red,
                  description: `${user} has not been registered yet.`
                }});
              } else {
                db.run(`UPDATE scrimCopsUser SET user_is_beta="${args[2][0].toUpperCase() + args[2].slice(1)}" WHERE user_id="${user.id}"`).then(row => {
                  return message.channel.send({embed: {
                    color: this.client.color.green,
                    description: `Succesfully updated **${user}'s** beta to **${args[2][0].toUpperCase() + args[2].slice(1)}**!`
                  }}); 
                });
              }
            });
            return;
          } else {
            return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to put in an option!\n\n**Options:**\n\`verify <{yes, no}> <@user>\`\n\`rank <{pro, staff, moderator, administrator, developer}> <@user>\`\n\`staff <{yes, no}> <@user>\`\n\`beta <{yes, no}> <@user>\``
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