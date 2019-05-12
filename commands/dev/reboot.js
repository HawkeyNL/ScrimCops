const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Reboot extends Command {
    constructor(client) {
      super({
        name: 'reboot',
        description: 'This command is used to reboot the bot.',
        usage: `${client.prefix}reboot`,
        category: 'dev',
        enabled: true,
        ownerOnly: true,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
    }
  
    async run(message, args) {
        message.channel.send({embed: { color: this.client.color.green, description: `Succesfully rebooted with \`${Math.round(this.client.ws.ping)}ms\`.` }}).then(() => this.client.shard.respawnAll());
    }
}

module.exports = Reboot;