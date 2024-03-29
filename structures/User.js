const { Structures, MessageEmbed } = require('discord.js');

const db = require("sqlite");
const path = require('path');
const dbPath = path.resolve(__dirname, '../dataScrimCops.sqlite');

Structures.extend('User', User => {
  
    db.open(dbPath);
  
    class UserExtand extends User {
        constructor(...args) {
            super(...args);
        }

      get isBeta() {
        return db.get(`SELECT user_is_beta FROM scrimCopsUser WHERE user_id="${this.id}"`) || console.log('No beta!');
      }
      
      get version() {
        return db.get(`SELECT user_version FROM scrimCopsUser WHERE user_id="${this.id}"`) || console.log('No version!');
      }
      
      get rank() {
        return db.get(`SELECT user_rank FROM scrimCopsUser WHERE user_id="${this.id}"`) || console.log('No rank!');
      }
      
      get isStaff() {
        return db.get(`SELECT user_is_staff FROM scrimCopsUser WHERE user_id="${this.id}"`) || console.log('No staff!');
      }
    }
    return UserExtand; 
});