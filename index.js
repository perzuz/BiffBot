const Discord = require('discord.js');

const client = new Discord.Client();

var isReady = true;

client.once('ready', () => {
    console.log('Hello Mcfly, Anybody Home!?');
});

const prefix = '-'

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot || !isReady) return;

    isReady = false;

    var voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection =>
    {
       const dispatcher = connection.play('resources/Butthead.mp3', { volume : 0.9});
       
       dispatcher.on("finish", end => {
         voiceChannel.leave();
         });

     }).catch(err => console.log(err));
     isReady = true;

});

// needs to be last line apparently
client.login('NzU3NjQ0Njc3ODMzOTQ5MjQ0.X2jZlw.k7Eo2EDa2k4nQObjWP-XQ5AQO28');
