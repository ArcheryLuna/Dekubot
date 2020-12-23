const Client = require("../structure/client");
const { MessageEmbed, ClientApplication, MessageAttachment } = require('discord.js');
const { Message } = require('discord.js')
const level = require("discord-xp")
level.setURL("mongodb+srv://Yeet:yeet@cluster0.i9vrh.mongodb.net/Data")
const canvacord = require("canvacord")
module.exports = {
    name: "lb",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const rawLeaderboard = await level.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
 
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
        const leaderboard = await level.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
 
        const lb = await leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.


        message.channel.send(new MessageEmbed()
            .setDescription(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
            .setColor("GREEN")
        )
    }
}
