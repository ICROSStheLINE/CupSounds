const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { playAudio } = require('./playaudio.js');

module.exports = {
	data: new SlashCommandBuilder().setName('cupboard').setDescription('Activates the Cupboard arsenal.'),
	async execute(interaction) {
		const gamble = new ButtonBuilder().setCustomId('gamble').setLabel('Let\'s go gambling!').setStyle(ButtonStyle.Primary);

		const nothing = new ButtonBuilder().setCustomId('nothing').setLabel('Nothing').setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(gamble, nothing);

		const response = await interaction.reply({
			content: `Which audio are we playing?`,
			components: [row],
			withResponse: true,
		});

		// const collectorFilter = (i) => i.user.id === interaction.user.id;
		try {
			while (true)
			{
				// const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 50_000 });
				const confirmation = await response.resource.message.awaitMessageComponent();
	
				if (confirmation.customId === 'gamble') {
					playAudio('gamblecore.ogg');
					// await confirmation.update({ content: `Sarah has been beaten and tortured viciously and relentlessly for no reason.`, components: [] });
					await confirmation.update();
				} else if (confirmation.customId === 'nothing') {
					await confirmation.update();
				}
			}
		} catch (e){
			await interaction.editReply({ content: 'Confirmation not received, cancelling', components: [] });
			console.error("ERROR ERROR ERROR!!!! " + e);
		}
	},
};