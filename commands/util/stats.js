const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');  
const os = require('os');
const db = require("sqlite");

class Stats extends Command {
  constructor(client) {
      super({
        name: 'stats',
        description: 'This command is used to see the statistics of the client.',
        usage: `${client.prefix}stats <{null, s, b}>`,
        category: 'util',
        enabled: true,
        ownerOnly: false,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
  }
  
  async run(message, args) {
        
          const usage = Math.round((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)),
          cpu = Math.floor(process.cpuUsage().user/process.cpuUsage().system),
          user = message.mentions.users.first() || message.author,
          member = message.guild.member(user);
    
          const promises = [
      		  this.client.shard.fetchClientValues('guilds.size'),
            this.client.shard.fetchClientValues('channels.size'),
      		  this.client.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)')
      		];
          
          Promise.all(promises).then(async results => {
          const path = require('path');
          const dbPath = path.resolve(__dirname, '../../dataScrimCops.sqlite');
          await db.open(dbPath);
            
        let botEmbed = new Discord.MessageEmbed()
                          .setColor(this.client.color.main)
                          .setAuthor(this.client.user.tag, this.client.user.avatarURL())
                          .setThumbnail(this.client.user.avatarURL())
                          .addField(`Uptime`, moment.duration(this.client.uptime).format(`D [D], H [H], m [M], s [S]`), true)
                          .addField(`Platform`, os.platform(), true)
                          .addField(`Memory Usage`, `${usage} MB`, true)
                          .addField(`CPU Usage`, `${cpu}%`, true)
                          .addField(`Stable Bot Version`, this.client.version, true)
                          .addField(`Master Bot Version`, this.client.beta, true)
                          .addField(`Discord.js`, Discord.version, true)
                          .addField(`Client Extension`, `discord.excord.js`, true)
                          .addField(`Node.js`, process.version, true)
                          .addField(`Commands`, this.client.commands.size, true)
                          .addField(`Guilds`, results[0].reduce((prev, guildCount) => prev + guildCount, 0))
                          .addField(`Channels`, results[1].reduce((prev, channelCount) => prev + channelCount, 0), true)
                          .addField(`Users`, results[2].reduce((prev, memberCount) => prev + memberCount, 0))

        let guildEmbed = new Discord.MessageEmbed()
                          .setColor(this.client.color.main)
                          .setAuthor(message.guild.name[0].toUpperCase() + message.guild.name.slice(1), message.guild.iconURL())
                          .addField(`Name`, message.guild.name[0].toUpperCase() + message.guild.name.slice(1), true)
                          .addField(`ID`, message.guild.id, true)
                          .addField(`Owner`, message.guild.owner, true)
                          .addField(`Region`, message.guild.region[0].toUpperCase() + message.guild.region.slice(1), true)
                          .addField(`Large`, message.guild.large === false ? 'No' : 'Yes', true)
                          .addField(`Partnered`, `Not yet implemented.`, true)
                          .addField(`Verify Level`, message.guild.verificationLevel, true)
                          .addField(`Verified`, message.guild.verified === false ? 'No' : 'Yes', true)
                          .addField(`Emojis`, message.guild.emojis.size, true)
                          .addField(`Users`, message.guild.memberCount, true)
                          .addField(`Humans`, message.guild.members.filter(m => !m.user.bot).size, true)
                          .addField(`Bots`, message.guild.members.filter(m => m.user.bot).size, true)
                          .addField(`Created`, moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
                          .addField(`Bans`, message.guild.fetchBans().size === undefined ? 'Missing permissions to fetch.' : null, true)
                          .addField(`Invites`, message.guild.fetchInvites().size === undefined ? 'Missing permissions to fetch.' : null)
                          .addField(`Roles`, message.guild.roles.map(r => r.toString()).join(' • '))
    
    db.get(`SELECT * FROM scrimCopsUser WHERE user_id="${message.author.id}"`).then(row => {
      
      if(!row) {
        return message.channel.send({embed: {
          color: this.client.color.red,
          description: `${message.author} | Please register yourself first by doing \`${this.client.prefix}register me\`!`
        }});
      } else {
        let userEmbed = new Discord.MessageEmbed()
                          .setColor(this.client.color.main)
                          .setAuthor(user.tag[0].toUpperCase() + user.tag.slice(1), user.avatarURL())
                          .setThumbnail(user.avatarURL())
                          .addField(`ID`, user.id, true)
                          .addField(`Game`, user.presence.activity ? user.presence.activity.name : 'No game found.', true)
                          .addField(`Status`, user.presence.status, true)
                          .addField(`Bot`, user.bot === false ? 'No' : 'Yes', true)
                          .addField(`Nickname`, member.nickname !== null ? `${member.nickname}` : 'No nickname found.')
                          .addField(`Created`, moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a'), true)
                          .addField(`Joined`, moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a'), true)
                          .addField(`Roles`, member.roles.map(r => r.toString()).join(' • '))
        
        let scrimCopsUserEmbed = new Discord.MessageEmbed()
                          .setColor(this.client.color.main)
                          .setAuthor(`${user.tag[0].toUpperCase() + user.tag.slice(1)} ScrimCops Data`, user.avatarURL())
                          .setThumbnail(user.avatarURL())
                          .addField(`ID`, row.user_id, true)
                          .addField(`IGN`, row.user_ign, true)
                          .addField(`Clan`, row.user_clan, true)
                          .addField(`Clan Position`, row.user_clan_position, true)
                          .addField(`Clan History`, row.user_clan_history_count, true)
                          .addField(`Version`, row.user_version, true)
                          .addField(`Beta`, row.user_is_beta, true)
                          .addField(`Rank`, row.user_rank, true)
                          .addField(`Staff`, row.user_is_staff, true)
                          .addField(`Verified`, row.user_verified, true)
                          .addField(`Created`, moment(row.user_created).fromNow())
    
        if(!args[0]) {
          return message.channel.send(userEmbed).then(m => m.channel.send(scrimCopsUserEmbed));
        } else if(args[0] === 's') {
          return message.channel.send(guildEmbed);
        } else if(args[0] == 'b') {
          return message.channel.send(botEmbed);
        }
      }
    }).catch(error => {
      if(error) {
        console.log(error);
      }
    });
   });
  }
}

module.exports = Stats;