const Client = require("../structure/client");
const randomPuppy = require('random-puppy')
const { Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: "meme",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const subReddits = ["meme", "me_irl", "dankmeme"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
        message.channel.send(new MessageEmbed()
            .setImage (img)
            .setTitle (`From /r/${random}`)
            .setURL (`http://reddit.com/${random}`)
            .setColor ('0000ff')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: "png"}))
        );
        
    }
}