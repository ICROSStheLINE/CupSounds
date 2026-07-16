const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const { serverId } = require('../../config.json');
// const { setTimeout } = require("timers/promises");

const leAudio = createAudioResource('../../scream.ogg');

module.exports = {
    data: new SlashCommandBuilder().setName('playaudio').setDescription('makes bot play audio in vc'),

	async execute(interaction) {
        let leVoiceConnection = await getVoiceConnection(serverId);
        if (!leVoiceConnection) { return; }

        let leAudioPlayer = await createAudioPlayer();
        leAudioPlayer.play(leAudio);
        leAudioPlayer.on('error', (error) => {
	        console.error(error);
        });
        leVoiceConnection.subscribe(leAudioPlayer);
	},
};