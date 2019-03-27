const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const hastebin = require("hastebin-gen");

class Eval extends Command {
    constructor(client) {
      super({
        name: 'eval',
        description: 'This command is used to evaluate javascript code within the bot.',
        usage: `${client.prefix}eval <code>`,
        category: 'dev',
        enabled: true,
        ownerOnly: true,
        modOnly: false,
        beta: false
      });
    
    this.client = client;
    }
  
    async run(message, args) {
        function clean(text) {
            if (typeof text !== 'string')
                text = require('util').inspect(text, { depth: 0 })
            //let rege = new RegExp(this.client.token, "gi");
            text = text
                .replace(/`/g, '`' + String.fromCharCode(8203))
                .replace(/@/g, '@' + String.fromCharCode(8203))
                //.replace(rege, '404: Missing Token')
            return text;
        };

        const evalEmbed = new Discord.MessageEmbed().setColor(this.client.color.main)
        const code = args.join(' ');
        try {
            const evaled = clean(await eval(code));
            evalEmbed.addField('📥 Input', `\`\`\`\n${code}\n\`\`\``);
            if (evaled.constructor.name === 'Promise') evalEmbed.addField('📤 Output (Promise)', `\`\`\`xl\n${evaled}\n\`\`\``)
            else evalEmbed.addField('📤 Output', `\`\`\`xl\n${evaled}\n\`\`\``);
            evalEmbed.setColor('0x42f468');
            if (evaled.length < 800) { message.channel.send(evalEmbed) }
            else {
                let url = await hastebin(evaled, "js").catch(err => console.log(err.stack));
                const newEmbed = new Discord.MessageEmbed()
                    .addField('📥 Input', `\`\`\`\n${code}\n\`\`\``)
                    .addField('📤 Output', `\n**[${url}](${url})**`)
                    .setColor(this.client.color.main);
                message.channel.send(newEmbed);
            }
        }
        catch (err) {
            evalEmbed.setColor(this.client.color.red);
            evalEmbed.addField('📤 Output', `\`\`\`xl\n${err}\n\`\`\``);

            message.channel.send(evalEmbed);
        }
    }
}

module.exports = Eval;