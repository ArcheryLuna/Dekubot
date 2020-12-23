const Client = require ('../structure/Client');
const { Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: "kick",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const {
            member,
            mentions
        } = message
        if(!member.hasPermission('KICK_MEMBERS' || 'ADMINISTRATOR'))
        {
            const msg = await message.channel.send(new MessageEmbed()
                .setDescription('You dont have the right permisions. \n Needed permisions is `KICK_MEMBERS` or `ADMINISTRATOR`')
                .setColor('RED')
            );
            msg.delete({timeout: 20000});
            setTimeout(() => {
                message.delete().catch(O_o=>{});
            });
        }
        const target = mentions.members.first();
        if(target)
        {
            const targetMember = message.guild.members.cache.get(target.id);
            if(targetMember.hasPermission('ADMINISTRATOR'))
            {
                const msg = await message.channel.send(new MessageEmbed()
                    .setDescription('You can\t kick an admin.')
                    .setColor('RED')
                )
                msg.delete({timeout: 20000})
                setTimeout(()=>{
                    message.delete().catch(O_o=>{})
                }, 20000)
            };
            const reason = args.splice(1).join(" ");
            if(!reason)
            {
                const msg = await message.channel.send(new MessageEmbed()
                    .setDescription(`Can't kick ${target.displayName} because there is no reason`)
                    .setColor('RED')
                );
                msg.delete({timeout: 20000})
                setTimeout(() => {
                    message.delete().catch(O_o=>{})
                }, 20000);
            }
            targetMember.kick().catch(err=>{
                message.channel.send(new MessageEmbed()
                    .setDescription(err)
                );
                return;
            });
            targetMember.send(new MessageEmbed()
                .setDescription(`You were kicked from \`${message.guild.name}\` for \`${reason}\`.`)
                .setColor('RANDOM')
            );
            const msg = await message.channel.send(new MessageEmbed()
                .setDescription(`${targetMember.user.username} has been kicked for ${reason}`)
            );
            msg.delete({timeout: 20000});
            var channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('log'));
            channel.send(new MessageEmbed()
            .setTitle('Member Kicked')
            .addField(`\`KIcked Member\``, `${target}`)
            .addField('\`Reason\`', `${reason}`)
            .addField('`Channel`', `${message.channel.name}`)
            .addField(`\`Person who Kicked them\``, `${message.author}`)
            .setColor('RANDOM')
            )
            setTimeout(()=>{
                message.delete().catch(O_o=>{});
            }, 20000);
        }
        else
        {
            const msg = await message.channel.send(new MessageEmbed()
                .setDescription('❌Please tag a person \n Command Format: &kick <member> <reason>')
                .setColor('RED')
            );
            msg.delete({timeout: 20000});
            setTimeout(() => {
                message.delete().catch(O_o=>{})
            }, 20000);
        }
    }
}