const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Ping extends Command {
    constructor(client) {
      super({
        name: 'ping',
        description: 'This command is used for moderators of the client.',
        usage: `${client.prefix}ping`,
        category: 'util',
        enabled: true,
        ownerOnly: false,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
    }
  
    async run(message, args) {
        const promises = [
      		  this.client.shard.fetchClientValues('ping')
      	];
      
        Promise.all(promises).then(async results => {
          message.channel.send({embed: { 
            color: this.client.color.green, 
            description: `Ping from all shards.`,
            fields: [
              {
                name: `Shard ${this.client.shard.id + 1}/${this.client.shard.count}`,
                value: `${this.client.ws.ping}`
              }
            ]
          }});
        });
    }
}

module.exports = Ping;