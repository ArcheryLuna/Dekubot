const Client = require("../structure/client");

const { Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const Field = 'Bot Version: `2.3.1`'
        const Field2 = 'Servers: `' + `${client.guilds.cache.size} Servers` + '`'
        const Field3 = 'Ping: `' + `${client.ws.ping}MS!` + '`'
        const msg = await message.channel.send(new MessageEmbed()
            .setDescription(`💬 | Check Your DM's`)
            .setColor('#5afd07')
        ).catch(err => {
            console.log(err)
        })
        msg.delete({ timeout: 20000 /*time unitl delete in milliseconds*/})
        if(!args[0]) {
            message.author.send(new MessageEmbed()
                .setTitle(`${message.author.username}'s Help`)
                .addField('`Prefix:`', "The Prefix is the y!", true)
                .addField('`economy:`', 'Economy commands help', true)
                .addField('`hourly:`', 'Get money from economy every hour', true)
                .addField('`daily:`', 'Get money from economy every day', true)
                .addField('`weekly:`', 'Get money from economy every week', true)
                .addField('`bal:`', 'show your economy ballance', true)
                .addField('`meme:`', 'The dankest memes on reddit', true)
                .addField('`steal:`', 'Get money by doing crime!!', true)
                .addField('`coinflip:`', 'Add a number in your ballance and state if its heads or tails', true)
                .addField('`lovecalc:`', 'Add two names and make a presentage of tru love', true)
                .addField('`modmail:`', 'New Modmail feature for moderation', true)
                .addField('`rank:`', 'ALL NEW LEVELING SYSTEM WITH A RANK CARD', true)
                .addField('`lb:`', 'Leaderboard command for the all new Rank command', true)
                .setColor('#00ffe8')
            ).catch(err => {
                console.log(err)
            })
            if(message.member.hasPermission('MANAGE_GUILD' || 'BAN_MEMBERS' || 'KICK_MEMBERS' || 'DEAFEN_MEMBERS' || 'MANAGE_CHANNELS' || 'MANAGE_GUILD' || 'MANAGE_MESSAGES' || 'ADMINISTRATOR' || 'MUTE_MEMBERS')) {
                message.author.send(new MessageEmbed()
                    .setTitle(`${message.author.username}'s Moderation commands for ${message.guild.name} Server!`)
                    .addField('`warn:`', 'NEW and IMPROVED warn command now send a message into a log channel', true)
                    .addField('`ban:`', 'Bans a member you target now cant ban administrators and has a new look', true)
                    .addField('`kick:`', 'Kicks a member you target now cant kick administrators and has a new look', true)
                    .addField('`mute:`', 'Mutes a user that has been targeted for 1 hour however requires a mute rule also disclamer if the bot turns off for any reson it becomes a perm mute', true)
                    .addField('`unmute:`', 'unmutes members', true)
                    .addField('`ping:`', 'PONG!', true)
                    .addField('`say:`', 'Say a message', true)
                    .addField('`modmail:`', 'New Modmail feature for moderation', true)
                    .addField(`\`sm:\``, `a slow mode command it counts the numbers in seconds`, true)
                    .addField('`sl:`', 'set someones level or yours needed perm is admin and manage messages',true)
                    .setColor('#00ffe8')
                )
            }
            setTimeout(() => {
                message.delete().catch(O_o => {})
            }, 20000)
            return
        }
        var more = args[1]
        if(more === 'modmail')
        {
            message.author.send(new MessageEmbed()
                .setTitle('Modmail Help')
                .setDescription('To modmail you will need a text channel called modmail and and the it should be able to create modmail tickets.')
            )
        }
        setTimeout(() => {
            message.delete().catch(O_o => {})
        }, 20000)
    }
}
