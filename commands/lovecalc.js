const Client = require("../structure/client");
const Random = require('random')
const {
    Message,
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: "lovecalc",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('Your First Name')
        if (!args[1]) return message.reply('There First name')

        var chance = Random.int(0, 100)
        var name1 = args[0]
        var name2 = args[1]

        message.channel.send(new MessageEmbed()
            .setTitle('The Love Calculator has spoken')
            .addField('Your Name', name1, true)
            .addField('Your crushes name', name2, true)
            .addField('Chance With Them', `${chance}%`)
            .setColor('F609C4')
        )
    }
}