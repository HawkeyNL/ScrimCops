const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Help extends Command {
  constructor(client) {
      super({
        name: 'help',
        description: 'This command is used to see all the different commands with detailed information.',
        usage: `${client.prefix}help [command]`,
        category: 'util',
        enabled: true,
        ownerOnly: false,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
  }
  
  async run(message, args) {
    async function send(client) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`Help`, client.user.avatarURL())
          .setThumbnail(client.user.avatarURL())
          .setDescription(`Use \`${client.prefix}help <command>\` to view detailed information about a command.\n\n*Required* arguments listed in **<>**\n*Optional* arguments listed in **[]**\n*Choosable (Max 1)* arguments listed in **{}**.`)
          .setColor(client.color.main);
        const categoriesMap = {};
        for (const command of client.commands.array()) {
          const { category } = command;
          if (!(category in categoriesMap)) categoriesMap[category] = [];
          if(!categoriesMap[category].includes(command.name)) categoriesMap[category].push(command.name);
        }
        for (const category in categoriesMap) embed.addField(`❯ ${category.replace(category[0], category[0].toUpperCase())}`, `${categoriesMap[category].join(' • ')}`);
        return await message.channel.send(embed);
    }
    
    if(args[0]) {
      const cmd = this.client.commands.get(args[0].toLowerCase());
      if(!cmd) return await send(this.client);
      const embed = new Discord.MessageEmbed()
                              .setAuthor(`Help about ${cmd.name}`, this.client.user.avatarURL())
                              .setColor(this.client.color.main)
                              .addField(`Description:`, cmd.description)
                              .addField(`Usage`, cmd.usage, true)
                              .addField(`Category:`, `\`${cmd.category}:${cmd.name}\``);
      
      if(message.author.id === this.client.owner) {
          embed.addField(`Enabled:`, cmd.enabled, true);
          embed.addField(`Owner Only:`, cmd.ownerOnly, true);
          embed.addField(`Beta:`, cmd.beta, true);
      }
      return await message.channel.send(embed);
    }
    
    return await send(this.client);
  }
}

module.exports = Help;