const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { channelId, serverId } = require('../../config.json');
// const { setTimeout } = require("timers/promises");


module.exports = {
    data: new SlashCommandBuilder().setName('joinvc').setDescription('makes bot leave vc'),
    
	async execute(interaction) {
        let connection = joinVoiceChannel({
            channelId: channelId,
            guildId: serverId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });
	},

};