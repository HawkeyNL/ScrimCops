const Command = require("../../structures/Command.js");

const db = require("sqlite");

// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: 'n8.nodehost.ca',
//     user: 'eorsy1_db',
//     password: process.env.DBPASSWORD,
//     database: 'eorsy1_db'
// });

class Register extends Command {
  constructor(client) {
      super({
        name: 'register',
        description: 'This command is used register an account for a Critical Ops user or a Critical Ops in-game clan.',
        usage: `${client.prefix}register <{me, clan}>`,
        category: 'user',
        enabled: true,
        ownerOnly: false,
        modOnly: false,
        beta: true
      });
    
    this.client = client;
  }
  //const args = 'whatever';
  //message.channel.send(args.charAt(0).toUpperCase() + args.slice(1)); use if an user inputs the team as 'phoenix team' it will put it in as Phoenix team or Phoenix Team
  async run(message, args) {
    
    const path = require('path');
    const dbPath = path.resolve(__dirname, '../../dataScrimCops.sqlite');
    await db.open(dbPath);
    
    let ver = this.client.version;
    
    if(!args[0]) return message.channel.send({embed: {color: this.client.color.red, description: `You forgot to put in an option.\n\n**Options:**\n\`me\` to register yourself.\n\`clan\` to register your own clan to ${this.client.user.toString()}.`}});
    if(args[0] === 'clan' && message.author.id === this.client.owner) {
      let data = db.get(`SELECT * FROM scrimCopsUser WHERE user_id ="${message.author.id}"`).then(row => {
        
        if(!args[1]) return message.channel.send({embed: {
            color: this.client.color.main,
            description: `${message.author} | Please register your clan name. Do the following things.\n\nPlease respond your clan name in all lowercase letters.\nExample: \`pro clan\``
          }}).then(m => {
          const filter = m => m.author.id === message.author.id && !m.author.bot;
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 60000,
              error: ['time']
            }).then(response => {
              //let answer = response.map(r => r.content)[0].toLowerCase();
              let answer = response.map(r => r.content);
              //let answergood = answer.charAt(0).toUpperCase() + answer.slice(1);
              message.channel.send(`Input: ${answer}`);
          });
        });
      }).catch(error => {
        if(error) {
          return message.channel.send({embed: {
            color: this.client.color.red,
            description: `${message.author} | Please register yourself first by doing \`${this.client.prefix}register me\`!`
          }});
          console.log(error);
        }
      });
      return; 
    } else if(args[0] === 'me') {
        message.channel.send({embed: {
          color: this.client.color.main,
          description: `${message.author} | Are you sure you want to register on v${this.client.version}?\n\n__**!IMPORTANT!**__\n\n__If you already registerd, your information will be lost!__\n\n**Y**es/**N**o`
        }}).then(m => {
          const filter = m => m.author.id === message.author.id && !m.author.bot;
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            error: ['time']
          }).then(async response => {
            let answer = response.map(r => r.content)[0].toLowerCase();
            if (answer.startsWith("y")) {
                
                  await db.get(`SELECT * FROM scrimCopsUser WHERE user_id ="${message.author.id}"`).then(row => {
                      if(!row) {
                        db.run("INSERT INTO scrimCopsUser (user_id, user_ign, user_clan, user_clan_position, user_clan_history_count, user_version, user_is_beta, user_rank, user_is_staff, user_verified, user_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.author.id, message.author.username, 'Clanless', 'No position found.', 0, ver, 'No', 'Critical Ops Players', 'No', 'No', Date.now()]);
                        console.log(`[Database] Inserted another user into table`);
                      }
                  }).catch(() => {
                    db.run("CREATE TABLE IF NOT EXISTS scrimCopsUser (user_id INTEGER, user_ign TEXT, user_clan TEXT, user_clan_position TEXT, user_clan_history_count INTEGER, user_version TEXT, user_is_beta TEXT, user_rank TEXT, user_is_staff TEXT, user_verified TEXT, user_created TIMESTAMP)").then(() => {
                      console.log(`[Database] Created Table`);
                      db.run("INSERT INTO scrimCopsUser (user_id, user_ign, user_clan, user_clan_position, user_clan_history_count, user_version, user_is_beta, user_rank, user_is_staff, user_verified, user_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.author.id, message.author.username, 'Clanless', 'No position found.', 0, ver, 'No', 'Critical Ops Players', 'No', 'No', Date.now()]);
                    });
                  });
                
                  message.channel.send({embed: {
                      color: 0x229954,
                      description: `${message.author} | You have succesfully been registered to ScrimCops!\nView your information with \`${this.client.prefix}stats\`.`
                    }});
              return;
            } else {
              message.channel.send({embed: {
                color: this.client.color.red,
                description: `Succesfully canceled your registration.`
              }});
              return;
            }
          }).catch(e => {
            console.log(e);
            message.channel.send({embed: {
              color: this.client.color.red,
              description: `${message.author} | You have ran out of time, you had 30 seconds to respond. Please try again!`
            }});
          });
        });
      return; 
    }
  }
}

module.exports = Register;