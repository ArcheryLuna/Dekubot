const { error } = require('console');
const { MessageEmbed, Client, Collection, Activity } = require('discord.js')
const mongoose = require("mongoose")
const levels = require('discord-xp')
const random = require("random")
levels.setURL("mongodb+srv://archery:Combo2018@cluster0.5h5st.mongodb.net/data")
mongoose.connect('mongodb+srv://archery:Combo2018@cluster0.5h5st.mongodb.net/data"', { useNewUrlParser: true, useUnifiedTopology: true })
console.log("Connected to Mongodb Database")
class ModmailClient extends Client {
    constructor() {
        super();
        /*
        dependencies
        */
       this.path = require('path')
       this.discord = require('discord.js')
       this.fs = require('fs')
       this.Random = require('random')
       this.jsonfile = require('jsonfile')
       /*
       Collections
       */ 
      this.commands = new Collection();
      this.threads = new Collection();
      /*
      constants
      */
     this.prefix = "$"
    }
    commandHandler(path) {
        this.fs.readdirSync(this.path.normalize(path)).map((f) => {
            const File = require(this.path.join(__dirname, `..`, path, f));
            this.commands.set(File.name, File)
        });
    }
    getCommand(cmd) {
        return this.commands.has(cmd) ? this.commands.get(cmd) : false;
    }
    start(token, path){
        this.commandHandler(path);
        this.login(token)
        this.on('ready', async () => {
            console.log("I am online and at your service")
            this.user.setActivity({
                name: `${this.guilds.cache.size} server | help`,
                type: "LISTENING"
            })
            
        })
        this.on('message', async message => {
            this.user.setActivity({
                name: `${this.guilds.cache.size} server | help`,
                type: "LISTENING"
            })
            const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
            if(message.author.bot)
            {
                return;
            }
            const randomXP = random.int(15, 25)

            const hasLvlup = await levels.appendXp(message.author.id, message.guild.id, randomXP)
            if (hasLvlup)
            {
                const user = await levels.fetch(message.author.id, message.guild.id)
                message.channel.send(new MessageEmbed()
                    .setDescription(`${message.author}, Has leveled up to ${user.level}`)
                    .setColor("GREEN")
                )
            }
            if(!message.guild || !message.content.toLowerCase().startsWith(this.prefix)) return;
            const cmd = args.shift().toLowerCase();
            const command = this.getCommand(cmd)
            if(command) return command.run(this, message, args).catch(console.error);
        })
        
            
        
    }
    embed(data, message) {
        return new MessageEmbed(data) .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: "png"}))
    }
}
module.exports = ModmailClient