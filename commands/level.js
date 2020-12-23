const Client = require("../structure/client");
const { MessageEmbed, ClientApplication, MessageAttachment } = require('discord.js');
const { Message } = require('discord.js')
const level = require("discord-xp")
level.setURL("mongodb+srv://archery:Combo2018@cluster0.5h5st.mongodb.net/data")
const canvacord = require("canvacord")
module.exports = {
    name: "rank",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const target = message.author

        const user = await level.fetch(target.id, message.guild.id)

        const neededXp = level.xpFor(parseInt(user.level) + 1)
        if (!user)
        {
            message.channel.send(new MessageEmbed()
                .setDescription(`${target} does not have xp Try send some messages`)
                .setColor("RED")
            )
            return;
        }
        const rank = new canvacord.Rank()
            .setAvatar(message.author.avatarURL({format:"png", dynamic: false}))
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setProgressBar('#FFA500', "COLOR")
            .setUsername(message.author.username)
            .setStatus(message.author.presence.status)
            .setDiscriminator(message.author.discriminator)
            .setLevel(user.level)
            .setBackground("IMAGE", "gal.png")
        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, 'rank.png')
                message.channel.send(attachment)
            })
    }
}