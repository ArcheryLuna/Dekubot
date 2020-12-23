const db = require('quick.db')
const Client = require("../structure/client");
const { Message } = require('discord.js');
module.exports = {
    name: "setwelcome",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(client.embed({
            description: "You don't have permisions for this command"
        }, message))
        let channel = message.mentions.channels.first()
        if(!channel) {
            return message.channel.send(client.embed({
                description: "Please mention the channel first"
            }, message))
        }
        db.set(`welchannel_${message.guild.id}`, channel.id)
        message.channel.send(`Welcome Channel is now set as ${channel}`)
    }
}