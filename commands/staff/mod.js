const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Mod extends Command {
    constructor(client) {
      super({
        name: 'mod',
        description: 'This command is used for moderators of the client.',
        usage: `${client.prefix}mod`,
        category: 'staff',
        enabled: true,
        ownerOnly: false,
        modOnly: true,
        beta: false
      });
    
    this.client = client;
    }
  
    async run(message, args) {
        message.channel.send({embed: { color: this.client.color.green, description: `Testing command.` }});
    }
}

module.exports = Mod;