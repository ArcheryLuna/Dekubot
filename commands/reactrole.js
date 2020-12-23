const Client = require("../structure/client");
const { Message, MessageEmbed } = require('discord.js');
const { red, green } = require('../color.json')
const emotes = require('../emojis.json')
module.exports = {
    name: "reactrole",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('role'))
        if(!channel) {
            return message.channel.send(new MessageEmbed()
                .setDescription(':x:There is no get roles channel roles channel')
                .setColor('RED')
            )
        }
        if(!args[0]) {
            return message.channel.send(new MessageEmbed()
                .setDescription('Please pick a number of role between 1 - 5')
                .setColor('RED')
            )
        }
        var amount = args[0]

        if(amount === '1') {
            if(!args[1]) {
                message.channel.send(new MessageEmbed()
                    .setDescription('Send the role id')
                    .setColor('GREEN')
                )
            }
            
        }
    }
}