const Client = require("../structure/client");
const { Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: "purge",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async(client, message, args) => {
        const {
            member
        } = message
        if(!member.hasPermission('MANAGE_MESSAGES'))
        {
            const msg = await message.channel.send(new MessageEmbed()
                .setDescription('You don\'t have the right permisions \n Required permisons is `MANAGE_MESSAGES`')
                .setColor('RED')
            );
            msg.delete({timeout: 20000});
            message.delete({timeout: 20000}).catch(O_o=>{});
            return;
        }
        const deleteCount = parseInt(args[0], args[10])
        if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
            const msg = await message.channel.send(new MessageEmbed()
                .setDescription('Please enter a number between 2 and 100')
                .setColor('RED')
            )
            msg.delete({timeout: 20000});
            message.delete().catch(O_o=>{});
            return;
        }
        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)        
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
          var channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('log'));
          channel.send(new MessageEmbed()
              .setTitle('Purged Channel')
              .addField('Channel Purged', `${message.channel.name}`, true)
              .addField('Amount Purged', '`' + `${deleteCount}` + '`')
              .addField('From', `${message.author}`, true)
              .setColor('GREEN')
        )
        const msg = await message.channel.send(new MessageEmbed()
            .setDescription(`♻ | \`${message.author.username}\` has purged \`${deleteCount}\` messages in \`${message.channel.name}\``)
            .setColor('GREEN')
        )
        msg.delete({timeout : 20000})
    }
}