const Client = require("../structure/client");
const { MessageEmbed, ClientApplication } = require('discord.js');
const { Message } = require('discord.js')
module.exports = {
    name: "sm",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR"))
        {
            message.delete().catch(O_o => {})
            return;
        }
        var time = args[0]
        if (!time)
        {   
            message.channel.send(new MessageEmbed()
                .setDescription(`Slowmode is at **${message.channel.rateLimitPerUser}**`)
                .setColor("GREEN")
            )
            return;
        }
        message.channel.setRateLimitPerUser(time)
        const msg = await message.channel.send(new MessageEmbed()
            .setDescription(`Set the slowmode to : **${time}** seconds`)
            .setColor("GREEN")
        )
        msg.delete({ timeout: 20000 }).catch(O_o => { })
        var channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('log'));
        channel.send(new MessageEmbed()
            .setTitle('Slowmode added')
            .addField(`Slowmode channel`, `\`${message.channel.name}\``)
            .addField(`time`, `\`${time} seconds\``)
            .addField(`Sender`, `\`${message.author.tag}\``)
            .setColor('GREEN')
        )
    }
}