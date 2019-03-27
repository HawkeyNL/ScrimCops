const Discord = require('discord.js');

exports.run = async (client, message) => {
    
    if(message.content.startsWith(`<@!${process.env.ID}>`)) {
      return message.channel.send({embed: {
        color: client.color.main,
        description: `The prefix for <@${client.user.id}> is \`${client.prefix}\` !`,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL()
        }
      }});
    }
  
    if (!message.content.startsWith(client.prefix)) return;
    if (message.author.bot) return;
    
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    let getCommand = client.commands.get(cmd);
    
    if (!client.commands.has(cmd)) return;
  
    if(getCommand.enabled === false && message.author.id !== client.owner) return message.channel.send({embed: {
      color: client.color.main,
      description: `This has currently been disabled, because of some issues.`
    }});
  
    if(getCommand.ownerOnly === true && message.author.id !== client.owner) return message.channel.send({embed: {
      color: client.color.main,
      description: `This command has owner only enabled. You can not execute this the command.`
    }});
  
    if(getCommand.modOnly === true && message.author.id !== (message.author.rank === 'Moderator')) {
      return console.log('ModOnly is true!');
    }
  
    // if(getCommand.beta === true && message.author.version === client.beta) {
    //   return console.log('Beta is true!');
    // }

    const command = client.commands.get(cmd);
    command.run(message, args);
}