const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { serverId } = require('../../config.json');
// const { setTimeout } = require("timers/promises");


module.exports = {
    data: new SlashCommandBuilder().setName('leavevc').setDescription('makes bot leave vc'),
    
	async execute(interaction) {
        let leVoiceConnection = await getVoiceConnection(serverId);
        if (leVoiceConnection)
        {
            await leVoiceConnection.destroy();
        }
	},

};