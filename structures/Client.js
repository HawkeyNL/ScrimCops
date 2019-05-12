const Discord = require("discord.js");
const ms = require('parse-ms');

const CommandHandler = require('./CommandHandler.js');
const EventHandler = require('./EventHandler.js');
require('./Guild.js');
require('./User.js');

class ScrimOps extends Discord.Client {
  
    /**
     * Options for a CommandoClient
     * @property {string|string[]|Set<string>} [owner] - ID of the bot owner's Discord user, or multiple IDs
     */
  
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
  
  	/**
     * Owners of the bot, set by the {@link CommandoClientOptions#owner} option
     * <info>If you simply need to check if a user is an owner of the bot, please instead use
     * {@link CommandoClient#isOwner}.</info>
     * @type {?Array<User>}
     * @readonly
     */
    get owners() {
      if(!this.options.owner) return null;
      if(typeof this.options.owner === 'string') return [this.users.get(this.options.owner)];
      const owners = [];
      for(const owner of this.options.owner) owners.push(this.users.get(owner));
      return owners;
    }

    /**
     * Checks whether a user is an owner of the bot (in {@link CommandoClientOptions#owner})
     * @param {UserResolvable} user - User to check for ownership
     * @return {boolean}
     */
    isOwner(user) {
      if(!this.options.owner) return false;
      user = this.users.resolve(user);
      if(!user) throw new RangeError('Unable to resolve user.');
      if(typeof this.options.owner === 'string') return user.id === this.options.owner;
      if(this.options.owner instanceof Array) return this.options.owner.includes(user.id);
      if(this.options.owner instanceof Set) return this.options.owner.has(user.id);
      throw new RangeError('The client\'s "owner" option is an unknown value.');
    }
}

module.exports = ScrimOps;