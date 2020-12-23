const Client = require("../structure/client");
const emotes = require('../emojis.json');
const { red, green } = require('../color.json')
const ms = require(`ms`);
const {
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "mute",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const {
            member,
            mentions
        } = message
        if (!member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send(new MessageEmbed()
                .setDescription(`${emotes.error} ${message.author}, You dont have permisions for this command`)
                .setColor('F60909')
            )
        }
        if (!message.guild.roles.cache.find(x => x.name === 'mute')) {
            return message.channel.send(new MessageEmbed()
                .setDescription(`${emotes.error} There is no ` + '`mute`' + ` role reminder must be in lowercaps`)
                .setColor('FF0000')
            )
        }
        const target = mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            if (targetMember.hasPermission('ADMINISTRATOR')) {
                return message.channel.send(new MessageEmbed()
                    .setDescription(`${emotes.error} You Can't mute an admin`)
                    .setColor('F60909')
                )
            }
            if(!targetMember.hasPermission('SEND_MESSAGES')) {
                return message.channel.send(new MessageEmbed()
                    .setDescription(`${emotes.error} ${target}, is all ready muted`)
                    .setColor(red)
                )
            }
            message.channel.send(new MessageEmbed()
                .setDescription(`${emotes.success} You have muted ${target} for 1hr`)
                .setFooter('Reminder if the bot turns off the mute will become perminant')
                .setColor('09F62D')
            )
            targetMember.roles.add(message.guild.roles.cache.find(x => x.name === 'mute'))
            var channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('log'));
            channel.send(new MessageEmbed()
                .setTitle('Muted member')
                .addField('Member muted', `${target}`, true)
                .addField('From', `${message.author}`, true)
                .setTimestamp('Timestamp')
                .setColor('GREEN')
            )

            setTimeout(() => {
                targetMember.roles.remove(message.guild.roles.cache.find(x => x.name === 'mute'))
                message.channel.send(new MessageEmbed()
                    .setDescription(`${emotes.success} unmuted ${target}`)
                    .setColor('09F62D')
                )
                channel.send(new MessageEmbed()
                    .setDescription(`${target}'s mute period over`)
                    .setColor('GREEN')
                )
            }, 3600000)
        } else {
            return message.channel.send(new MessageEmbed()
                .setDescription(`${emotes.error} please mention someone to mute`)
                .setColor('FF0000')
            )
        }
    }
}