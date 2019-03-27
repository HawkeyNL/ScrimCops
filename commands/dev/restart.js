const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Restart extends Command {
    constructor(client) {
      super({
        name: 'restart',
        description: 'This command is used to restart the bot.',
        usage: `${client.prefix}restart`,
        category: 'dev',
        enabled: true,
        ownerOnly: true,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
    }
  
    async run(message, args) {
        message.channel.send({embed: { color: this.client.color.green, description: `Succesfully restarted with \`${this.client.ws.ping}ms\`.` }}).then(() => process.exit());
    }
}

module.exports = Restart;