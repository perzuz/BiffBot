const Discord = require('discord.js')

const client = new Discord.Client()

var isReady = true

client.once('ready', () => {
	console.log('Hello Mcfly, Anybody Home!?')
})

const prefix = '-'

// const dispatcher_on_start = () => {
//     console.log('audio.mp3 is now playing!');
// }

// const dispatcher_on_finish = (voiceChannel) => {
//     console.log('audio.mp3 has finished playing! Disconnecting from voice channel');
//     voiceChannel.leave();
// }

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot || !isReady)
		return

	isReady = false

	var voiceChannel = message.member.voice.channel
	voiceChannel
		.join()
		.then(connection => {
			const dispatcher = connection.play('resources/Butthead.mp3', {
				volume: 0.9,
			})
			dispatcher.on('start', () => {
				console.log('audio.mp3 is now playing!')
			})
			dispatcher.on('finish', () => {
				voiceChannel.leave()
			})
			//dispatcher.on('start', dispatcher_on_start);

			//dispatcher.on("finish", dispatcher_on_finish);
		})
		.catch(err => console.log(err))
	isReady = true
})

// needs to be last line apparently
var config = require('./config.json')
client.login(config.token)
