const Client = require("../structure/client");
const { Message, MessageEmbed } = require('discord.js');
const emotes = require('../emojis.json')
module.exports = {
    name: "modmail",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        if(client.threads.has(`${message.author.id}`)) return message.channel.send(client.embed({
            description: `You already have a ticket open!`
        }, message))
        const channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('modmail'))
        if(!channel) return message.channel.send(new MessageEmbed()
            .setDescription(`${emotes.error} There is no mod mail channel! :exclamation:`)
            .setColor('FF0000')
        )
        const Messages = []
        const newChannel = await message.guild.channels.create(`modmail-${message.author.id}`, {
            type: 'text',
            parent: client.catagory,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: message.author.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ]
        })
        channel.send(client.embed({
            description: `The User ${message.author.tag} (${message.author.id}) is creating a modmail thread! Created in ${newChannel}!`
        }, message))
        client.threads.set(message.author.id, {
            channel: newChannel
        })
        const channelCollecter = newChannel.createMessageCollector((msg) => msg.channel.id == newChannel.id)
        const DMcollecter = await message.author.send(client.embed({
            description: 'This is the beginning of your conversation.'
        }, message)).then(async(msg) => await msg.channel.createMessageCollector((msg) => msg.author.id == message.author.id))
        channelCollecter.on('collect', async(m) => {
            if(m.author.bot) return;
            if(m.content.toLowerCase() == `${client.prefix}close`) return channelCollecter.stop("closed"), message.author.send(new MessageEmbed()
                .setDescription('Ticket Closed')
                .setColor('00E8FF')
            ), newChannel.send(client.embed({
                description: 'Ticket Closed'
            }, message)), Messages.push(`[Support] **${m.member.displayName}**: ${m.content}`)
            Messages.push(`${message.author.username} : ${m.content}`)
            message.author.send(`[Support]**${m.member.displayName}**: ${m.content}`)
        })
        DMcollecter.on('collect', async(m) => {
            if(message.author.bot) return;
            if(message.content.toLowerCase() == `${client.prefix}close`) return message.author.send('You cant close in here')
            Messages.push(`[Suppport]${m.author.username}: ${m.content}`)
            newChannel.send(`**${message.author.username}** : ${m.content}`)
        })
        channelCollecter.on('end', async(collected, reason) => {
            if(reason == "closed") {
                DMcollecter.stop()
                newChannel.send(`Generating Transcript`);
                await client.fs.writeFileSync(`../${newChannel.name}_transcript.txt`, Messages.join('\n'))
                channel.send(new client.discord.MessageAttachment(client.fs.createReadStream(`../${newChannel.name}_transcript.txt`)))
                setTimeout(() => {
                    newChannel.delete()
                    client.threads.delete(message.author.id)
                }, 5000)
            }
        })

    }
}