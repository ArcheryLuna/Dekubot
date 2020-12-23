const Client = require("../structure/client");
const { Message, MessageEmbed } = require('discord.js');
const { red, green } = require('../color.json')
const emotes = require('../emojis.json')
module.exports = {
    name: "invite",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const msg = await message.channel.send(new MessageEmbed()
            .setDescription('💬 | Check your DMs')
            .setColor('GREEN')
        )
        setTimeout(() => {
            message.delete().catch(O_o => {})
        }, 20000)
        msg.delete({timeout: 20000})
        message.author.send(new MessageEmbed()
            .setTitle('`Invite your Deku Bot!`' + `${message.author.username}`)
            .addField('`yeet gamers Bot invite Link`', 'https://discord.com/api/oauth2/authorize?client_id=788686776881512468&permissions=8&scope=bot')
            .addField('`Join The Support Server:`', 'https://discord.gg/2uMFrNvH4X')
            .setFooter('Based off of deku bot')
            .setColor('RANDOM')
        )
    }
}
