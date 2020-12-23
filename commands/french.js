const Client = require("../structure/client");
const { Message, MessageEmbed } = require('discord.js');
const { red, green } = require('../color.json')
const emotes = require('../emojis.json')
const translate = require('translate-google')
module.exports = {
    name: "fr",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const sayMessage = args.join(' ')

        message.delete().catch(O_o => {})
        if (!args[0]) {
            return message.channel.send(new MessageEmbed()
                .setDescription(`:x: You diden't enter something to translate`)
                .setColor('RED')
            )
        }

        translate(sayMessage, {
            to: "fr"
        }).then(res => {
            message.channel.send(new MessageEmbed()
                .setDescription(`[${message.author}] [fr] ${res}`)
                .setColor('GREEN')
            )
        }).catch(err => {
            console.log(err)
        })
    }
}