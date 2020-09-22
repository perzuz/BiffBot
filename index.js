const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

var isReady = true

function getRandomVoiceLine()
{
  var files = fs.readdirSync('resources')
  return 'resources/' + files[Math.floor(Math.random() * files.length)] 
}

client.once('ready', () => {
	console.log('Hello Mcfly, Anybody Home!?')
})

const prefix = '-'

const dispatcher_on_start = () => {
    console.log('audio.mp3 is now playing!');
}

const dispatcher_on_finish = (vc) => {
    console.log('audio.mp3 has finished playing! Disconnecting from voice channel');
    vc.leave();
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot || !isReady)
		return

	isReady = false
    file = getRandomVoiceLine();
	var voiceChannel = message.member.voice.channel
	voiceChannel
		.join()
		.then(connection => {   
			const dispatcher = connection.play(file, {
				volume: 0.9,
			})
			dispatcher.on('start', dispatcher_on_start);

			dispatcher.on("finish", () => dispatcher_on_finish(voiceChannel));
		})
		.catch(err => console.log(err))
	isReady = true
})

var config = require('./config.json')
client.login(config.token)