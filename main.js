const Client = require('./structure/client')
const discord = require('discord.js')
const Discord = require('discord.js')
const jsonfile = require('jsonfile')
const WOFCommands = require('wokcommands')
const prefix = '$'
const prefix2 = '<@745977605626527752> '
const ms = require('ms')
const enmap = require('enmap')
const Random = require('random')
const fs = require('fs')
const db = require('quick.db')
const WOKCommands = require('wokcommands')
const eco = new enmap({
    name: 'Economy',
    description: 'This is the slot bot side of shit',
    cloneLevel: 'deep',
    fetchAll: false,
    autoFetch: true
})
const translate = require('translate-google')
const moment = require('moment')
const cooldownseco = new enmap({
    name: 'Cooldowns',
    description: 'This is the slot bot side of shit',
    cloneLevel: 'deep',
    fetchAll: false,
    autoFetch: true
})
const client = new discord.Client()
client.on('ready', async() => {
    console.log('ready')
})
client.on('message', async message => {
    if (message.author.bot) {
        return
    }
    if(message.content.toLowerCase() === 'thanks')
    {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription('Your welcome')
            .setColor('RANDOM')
        )
    }
    if (!message.content.startsWith(prefix) || !message.content.startsWith(prefix2)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'hourly') {
        const cooldowndata = await cooldownseco.get(`${message.author.id}-${message.guild.id}-hourly`);

        if (parseInt(cooldowndata) > Date.now(3600000)) return message.reply(`sorry cheif you gotta wait for about another ${ms(parseInt(cooldowndata) - Date.now(3600000), {long: true},)}`);

        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);
        eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + 5);

        message.reply(new Discord.MessageEmbed()
            .setTitle(`💵**HOURLY REWARD**💵`)
            .setDescription(`You have colected your reward your new balance is now $${currentbalance + 5}`).setColor('00ff00')
        );

        cooldownseco.set(`${message.author.id}-${message.guild.id}-hourly`, Date.now(3600000) + ms('1h'))
    }
    if (command === 'daily') {
        const cooldowndata = await cooldownseco.get(`${message.author.id}-${message.guild.id}-daily`);

        if (parseInt(cooldowndata) > Date.now(86400000)) return message.reply(`sorry cheif you gotta wait for about another ${ms(parseInt(cooldowndata) - Date.now(86400000), {long: true},)}`);

        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);
        eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + 10);

        message.reply(new Discord.MessageEmbed()
            .setTitle(`💵**DAILY REWARD**💵`)
            .setDescription(`You have colected your reward your new balance is now $${currentbalance + 10}`).setColor('00ff00')
        );

        cooldownseco.set(`${message.author.id}-${message.guild.id}-daily`, Date.now(86400000) + ms('1d'))
    } else if (command === 'ballance') {
        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);

        message.reply(new Discord.MessageEmbed()
            .setTitle(`💵**BALLANCE**💵`)
            .setDescription(`Your current ballance is ${currentbalance}`).setColor('00ff00')
        );
    } else if (command === 'bal') {
        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);

        message.reply(new Discord.MessageEmbed()
            .setTitle(`💵**BALLANCE**💵`)
            .setDescription(`Your current ballance is ${currentbalance}`).setColor('00ff00')
        );
    }
    if (command === 'weekly') {
        const cooldowndata = await cooldownseco.get(`${message.author.id}-${message.guild.id}-Weekly`);

        if (parseInt(cooldowndata) > Date.now(604800000)) return message.reply(`sorry chief you need to try again in ${ms(parseInt(cooldowndata) - Date.now(604800000), {long: true},)}`);
        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);
        eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + 20);

        message.reply(new Discord.MessageEmbed()
            .setTitle(`💵**WEEKLY REWARD**💵`)
            .setDescription(`You have colected your reward your new balance is now $${currentbalance + 20}`).setColor('00ff00')
        );

        cooldownseco.set(`${message.author.id}-${message.guild.id}-Weekly`, Date.now(604800000) + ms('7d'))
    } else if (command === 'economy') {
        message.reply(new Discord.MessageEmbed()
            .setTitle('**ECONOMY COMMANDS FOR DEKU BOT**')
            .addField('hourly:', 'Get money from economy every hour', true)
            .addField('daily:', 'Get money from economy every day', true)
            .addField('weekly:', 'Get money from economy every week', true)
            .addField('bal:', 'show your economy ballance', true).setColor('00ff00')
            .addField('coinflip:', 'Add a number in your ballance and state if its heads or tails', true)
        )
    } else if (command === 'coinflip') {

        const flip = Random.int(1, 2);

        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);

        var number = args[0]

        if (number === 'all') {
            var number = currentbalance
        }

        if (!number) return message.reply('you gave us no number!');

        if (number > currentbalance) return message.reply(`your current ballance ${currentbalance} your number was ${number}.`);

        var heads = args[1] === 'heads'

        var tails = args[1] === 'tails'

        if (tails) {

            if (flip === 1) {
                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance * 2);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Tails')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
            if (flip === 2) {

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Head')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
        }
        if (heads) {
            if (flip === 1) {
                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - number);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Heads')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
            if (flip === 2) {

                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - number);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Tails')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
        }
    } else if (command === 'cf') {

        const flip = Random.int(1, 2);

        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);

        var number = args[0]

        if (number === 'all') {
            var number = currentbalance
        }

        if (!number) return ('You dident give use a number');

        if (number > currentbalance) {
            message.reply(`That number is bigger than your ballance which is $${currentbalance}!`);
        }

        var heads = args[1] === 'heads'

        var tails = args[1] === 'tails'

        if (tails) {

            if (flip === 1) {
                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + number);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Tails')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
            if (flip === 2) {

                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - number);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Heads')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
        }
        if (heads) {
            if (flip === 1) {
                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + number);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Heads')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
            if (flip === 2) {
                eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - number);

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Tails')
                    .addField('New ballance:', `${currentbalance}`, true)
                )
            }
        }
    } else if (command === 'steal') {

        await eco.ensure(`${message.author.id}-${message.guild.id}`, 0);
        const currentbalance = await eco.get(`${message.author.id}-${message.guild.id}`);

        var randommoney = Random.int(1, 10000)

        var dice = Random.int(1, 10)

        if (dice === 3) {

            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - 10);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was unsucsessfull')

                .setDescription('The karen found your manager')
            )

            stop
        }
        if (dice === 1) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - 10);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was unsucsessfull')

                .setDescription('The bank of england is still safe!')
            )

            stop
        }
        if (dice === 2) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - 10);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was unsucsessfull')

                .setDescription('You couldent steal the crown jewles')
            )

            stop
        }
        if (dice === 4) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance - 10);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was unsucsessfull')

                .setDescription('The robery on the old lady was unsucsessfull')
            )

            stop
        }
        if (dice === 5) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + 90000);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was sucsessfull')

                .addField('Your ballance is now', `$${currentbalance}`, true)
                .setDescription(`You stole the Karens purse`)
            )

            stop
        }
        if (dice === 6) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + randommoney);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was sucsessfull')

                .addField('Your ballance is now', `$${currentbalance}`, true)
                .setDescription('You stole The Crown Jewles')
            )

            stop
        }
        if (dice === 7) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + randommoney);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was sucsessfull')

                .addField('Your current Ballance if now', `$${currentbalance}`)
                .setDescription('You stole The Bank of England')
            )

            stop
        }
        if (dice === 8) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + randommoney);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was sucsessfull')

                .addField('Your ballance is now:', `$${currentbalance}`)
                .setDescription('You stole a till')
            )

            stop
        }
        if (dice === 9) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + randommoney);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Robery was Succsessfull')

                .addField('Youre currentballance is', `$${currentbalance}`, true)
                .setDescription('You stole a till from the grocerie shop')
            )

            stop
        }
        if (dice === 10) {
            eco.set(`${message.author.id}-${message.guild.id}`, currentbalance + 1000000);

            message.channel.send(new Discord.MessageEmbed()
                .setTitle('You got the Old ladys hand bag')

                .addField('You got:', `$1,000,000`, true)
                .addField('new ballance:', `Your ballance is $${currentbalance}`, true)
                .setColor('FFC0CB')
            )

            stop
        }

    } 
})
client.login("Nzg4Njg2Nzc2ODgxNTEyNDY4.X9nHzA.VpTHwtykLr5im5hlX46Zu8XSMbc")
new Client().start("Nzg4Njg2Nzc2ODgxNTEyNDY4.X9nHzA.VpTHwtykLr5im5hlX46Zu8XSMbc", `./commands`)
//NzQ1OTc3NjA1NjI2NTI3NzUy.Xz5nyA.h1oeXANmVVY6TARDGbyJidfP4fs
