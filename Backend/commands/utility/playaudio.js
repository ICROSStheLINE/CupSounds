const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { serverId } = require('../../config.json');
const path = require('path');
// const { setTimeout } = require("timers/promises");



module.exports = {
    data: new SlashCommandBuilder().setName('playaudio').setDescription('makes bot play audio in vc'),
    
	async execute(interaction) {
        let leAudio = createAudioResource(createReadStream(path.join('gamblecore.ogg')), {inputType: StreamType.Arbitrary,});
        let leVoiceConnection = await getVoiceConnection(serverId);
        if (!leVoiceConnection) { return; }

        let leAudioPlayer = await createAudioPlayer();
        await leVoiceConnection.subscribe(leAudioPlayer);
        await leAudioPlayer.play(leAudio);
        leAudioPlayer.on('error', (error) => {
	        console.error(error);
        });

        leAudioPlayer.on(AudioPlayerStatus.Idle, () => {
            console.log('The audio player is idle!');
        });
        leAudioPlayer.on(AudioPlayerStatus.Buffering, () => {
            console.log('The audio player is buffering!');
        });
        leAudioPlayer.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player is playing!');
        });
        leAudioPlayer.on(AudioPlayerStatus.AutoPaused, () => {
            console.log('The audio player is autopaused!');
        });
        leAudioPlayer.on(AudioPlayerStatus.Paused, () => {
            console.log('The audio player is paused!');
        });
	},
};