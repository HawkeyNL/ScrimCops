const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');  
const os = require('os');
const db = require("sqlite");

class User extends Command {
  constructor(client) {
      super({
        name: 'user',
        description: 'This command is used to see the statistics of an user.',
        usage: `${client.prefix}user <@user>`,
        category: 'util',
        enabled: true,
        ownerOnly: false,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
  }
  
  async run(message, args) {
    
          const path = require('path');
          const dbPath = path.resolve(__dirname, '../../dataScrimCops.sqlite');
          await db.open(dbPath);

          const user = message.mentions.users.first() || message.author,
          member = message.guild.member(user);
    
          let userEmbed = new Discord.MessageEmbed()
                        .setAuthor(user.tag[0].toUpperCase() + user.tag.slice(1), user.avatarURL())
                        .setThumbnail(user.avatarURL())
                        .addField(`ID`, user.id, true)
                        .addField(`Game`, user.presence.game ? user.presence.game.name : 'No game found.', true)
                        .addField(`Status`, user.presence.status, true)
                        .addField(`Bot`, user.bot === false ? 'No' : 'Yes', true)
                        .addField(`Nickname`, member.nickname !== null ? `${member.nickname}` : 'No nickname found.')
                        .addField(`Created`, moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a'), true)
                        .addField(`Joined`, moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a'), true)
                        .addField(`Roles`, member.roles.map(r => r.toString()).join(' • '))
    
    db.get(`SELECT * FROM scrimCopsUser WHERE user_id="${user.id}"`).then(row => {
      
      if(!row) {
        message.channel.send({embed: {
          color: this.client.color.red,
          description: `${message.author} | **No ScrimCops Data Loaded**. You or ${user.toString()} hasn't been found in the database, please execute \`${this.client.prefix}register me\` to register.`
        }}).then(m => {
          m.delete({timeout: 20000});
          m.channel.send(userEmbed);
        });
      } else {
        let scrimCopsUserEmbed = new Discord.MessageEmbed()
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
    
          return message.channel.send(userEmbed).then(m => m.channel.send(scrimCopsUserEmbed));
      }
    }).catch(error => {
      if(error) {
        console.log(error);
      }
    });
  }
}

module.exports = User;