const {
    Structures,
    MessageEmbed
} = require('discord.js');

// const db = require("sqlite");
// db.open("../data.sqlite");

Structures.extend('Guild', Guild => {
    class GuildExtand extends Guild {
        constructor(...args) {
            super(...args);
        }
        
      //   get clan() {
      //     return {
      //       guild: {
      //           config: {
      //             guildID: db.get(`SELECT guildID FROM scrimCopsClan WHERE guildID="${this.id}"`) || null,
      //             scrimRecordChannelID: db.get(`SELECT scrimRecordChannelID FROM scrimCopsClan WHERE guildID="${this.id}"`) || null,
      //             extraScrimRecordChannelID: db.get(`SELECT extraScrimRecordChannelID FROM scrimCopsClan WHERE guildID="${this.id}"`) || null,
      //             scrimDataChannelID: db.get(`SELECT scrimDataChannelID FROM scrimcops scrimCopsClan WHERE guildID="${this.id}"`) || null
      //           },
      //           mod: {
      //             joinAndLeaveChannelID: db.get(`SELECT joinAndLeaveChannelID FROM scrimCopsClan`) || null,
      //             joinRoleID: db.get(`SELECT joinRoleID`) || null
      //           }
      //       }
      //     }
      // }
    }
    return GuildExtand; 
});