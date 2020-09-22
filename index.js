const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

var isReady = true;

function getRandomVoiceLine()
{
  // get a list of all the mp3s in resources
  var files = fs.readdirSync('resources')
  // choose a random file from the list
  return 'resources/' + files[Math.floor(Math.random() * files.length)] 
}

client.once('ready', () => {
    console.log('Hello Mcfly, Anybody Home!?');
});

const prefix = '-'

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot || !isReady) return;

    isReady = false;

    var voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection => {

        file = getRandomVoiceLine();
        const dispatcher = connection.play(file, { volume: 0.9 });

        dispatcher.on("finish", end => {
            voiceChannel.leave();
        });

    }).catch(err => console.log(err));
    isReady = true;

});

// needs to be last line apparently
client.login('NzU3NjQ0Njc3ODMzOTQ5MjQ0.X2jZlw.n_cdwC3UfF0fRyYgke0vvYqTXUU');
