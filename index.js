const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Hello Mcfly, Anybody Home!?');
});

const prefix = '-'

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send("What are you looking at ButtHead!?");
    }
});

// needs to be last line apparently
client.login('NzU3NjQ0Njc3ODMzOTQ5MjQ0.X2jZlw.sfzLsbl6Wq3WLzi1ycxWqeDA884');

