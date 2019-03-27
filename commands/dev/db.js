const Command = require("../../structures/Command.js");
const db = require("sqlite");

class Db extends Command {
    constructor(client) {
      super({
        name: 'db',
        description: 'This command is used to do anything related to the database.',
        usage: `${client.prefix}db <{table => {delete => {[table]}, inject}}>`,
        category: 'dev',
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
      
        if(args[0] === 'table') {
          if(args[1] === 'delete') {
            if(args[2] === 'user') {
              //check if table exists before executing.
              await db.get(`SELECT * FROM scrimCopsUser WHERE user_id ="${message.author.id}"`).then(row => {
                  if(!row) {
                    return db.run(`DROP TABLE scrimCopsUser`).then(() => {
                      message.channel.send({embed: {
                          color: this.client.color.main,
                          description: `Succesfully deleted the table \`scrimCopsUser\` in file \`data.sqlite\`, in \`${this.client.ws.ping}ms\`.`
                      }}).then(() => process.exit());
                    });
                  } else {
                    return message.channel.send({embed: {
                      color: this.client.color.main,
                      description: `Table you defined doesn't exist.`
                    }});
                  }
              }).catch(error => {
                  console.log(error);
              });
            } else {
              return message.channel.send({embed: {
                  color: this.client.color.main,
                  description: `You forgot to put in a table.\n\n**Tables:**\n\`user\` (user data table).`
              }});
           }
          } else {
            return message.channel.send({embed: {
                color: this.client.color.red,
                description: `You forgot to put in an option.\n\n**Options:**\n\`delete\` to delete a table in the sql file.`
            }});
          }
        } else {
          return message.channel.send({embed: {
              color: this.client.color.red,
              description: `You forgot to put in an option.\n\n**Options:**\n\`table\` to do anything related to a table in the sql file.`
          }});
        }
    }
}

module.exports = Db;