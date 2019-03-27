const Discord = require("discord.js");
const ms = require('parse-ms');

const CommandHandler = require('./CommandHandler.js');
const EventHandler = require('./EventHandler.js');
require('./Guild.js');
require('./User.js');

class ScrimOps extends Discord.Client {
    constructor(options) {
      super(options);
      
      this.commands = new Discord.Collection(); 
      this.commandsDir = options.commandsDir || null;
      this.eventsDir = options.eventsDir || null;
      this.eventHandler = new EventHandler(this);
      this.eventHandler.load(this.eventsDir);
      this.commandHandler = new CommandHandler(this);
      this.commandHandler.load(this.commandsDir);
      this.on('error', console.log);
      this.prefix = options.prefix;
      this.owner = options.owner;
      this.db = options.db || null;
      this.version = options.version || '0.0.1';
      this.beta = options.beta || 'beta';
      this.color = {
          main: 0x36393F,
          red: 0xA93226,
          green: 0x229954,
          yellow: 0xF1C40F,
          orange: 0xD35400
      };
      
      if(this.owner) {
          this.once('ready', () => {
            if(this.owner instanceof Array || this.owner instanceof Set) {
              for(const owner of this.owner) {
                this.users.fetch(owner).catch(err => {
                  this.emit('warn', `Unable to fetch owner ${owner}.`);
                  this.emit('error', err);
                });
              }
            } else {
              this.users.fetch(this.owner).catch(err => {
                this.emit('warn', `Unable to fetch owner ${this.owner}.`);
                this.emit('error', err);
              });
            }
          });
        }
    }
}

// class ScrimOps extends Discord.Client {
//     constructor(...args) {
//         super(...args);
//         // Command Handler
//         this.commands = new Discord.Collection();
//         this.aliases = new Discord.Collection();
//         this.commandHandler = new (require('./CommandHandler.js'))(this);
//         this.eventHandler = new (require('./EventHandler.js'))(this);
//         this.commandHandler.load();
//         this.eventHandler.load();
      
//         // Modules 
//         this.db = db;
        
//         // ScrimOps General
//         this.prefix = 's.';  
//         this.util = (require('./Util.js'));
//         this.owner = process.env.EVALID;
//         this.evalID = process.env.EVALID;
//         this.color = {
//           main: 0x36393F,
//           red: 0xA93226,
//           green: 0x229954,
//           yellow: 0xF1C40F,
//           orange: 0xD35400
//         };
              
//         if(this.owner) {
//           this.once('ready', () => {
//             if(this.owner instanceof Array || this.owner instanceof Set) {
//               for(const owner of this.owner) {
//                 this.users.fetch(owner).catch(err => {
//                   this.emit('warn', `Unable to fetch owner ${owner}.`);
//                   this.emit('error', err);
//                 });
//               }
//             } else {
//               this.users.fetch(this.owner).catch(err => {
//                 this.emit('warn', `Unable to fetch owner ${this.owner}.`);
//                 this.emit('error', err);
//               });
//             }
//           });
//         }
//     }
  
//     get owners() {
//       if(!this.owner) return null;
//       if(typeof this.owner === 'string') return [this.users.get(this.owner)];
//       const owners = [];
//       for(const owner of this.owner) owners.push(this.users.get(owner));
//       return owners;
//     }

//     isOwner(user) {
//       if(!this.owner) return false;
//       user = this.users.resolve(user);
//       if(!user) throw new RangeError('Unable to resolve user.');
//       if(typeof this.owner === 'string') return user.id === this.owner;
//       if(this.owner instanceof Array) return this.owner.includes(user.id);
//       if(this.owner instanceof Set) return this.owner.has(user.id);
//       throw new RangeError('The client\'s "owner" option is an unknown value.');
//     }
  
//     parseTime(milliseconds, from, seconds) {
//       var string = '', obj;
//       if (!from) obj = ms(Date.now() - milliseconds);
//       else obj = ms(milliseconds)
//       if (obj.days === 1) string += ` ${obj.days} day `
//       else if (obj.days > 1) string += ` ${obj.days} days `
//       if (obj.hours === 1) string += `${obj.hours} hour `
//       else if (obj.hours > 1) string += `${obj.hours} hours `
//       if (obj.minutes === 1) string += `${obj.minutes} minute `
//       else if (obj.minutes > 1) string += `${obj.minutes} minutes `
//       if (seconds && obj.seconds === 1) string += `${obj.seconds} second `
//       else if (seconds && obj.seconds > 1) string += `${obj.seconds} seconds `
//       if (string === '') string = 'Just now'
//       else string += 'ago'
//       return string;
//     }
// }

module.exports = ScrimOps;