const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('cupboard').setDescription('Activates the Cupboard arsenal.'),
	async execute(interaction) {
		const confirm = new ButtonBuilder().setCustomId('confirm').setLabel('Confirm Violent Torment').setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(cancel, confirm);

		const response = await interaction.reply({
			content: `Are you sure you want to torture Shaheer for no reason?`,
			components: [row],
			withResponse: true,
		});

		// const collectorFilter = (i) => i.user.id === interaction.user.id;
		try {
			// const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 50_000 });
			const confirmation = await response.resource.message.awaitMessageComponent({ time: 50_000 });

			if (confirmation.customId === 'confirm') {
				await confirmation.update({ content: `Test Confirmed`, components: [] });
			} else if (confirmation.customId === 'cancel') {
				await confirmation.update({ content: 'Test Canceled', components: [] });
			}
		} catch (e){
			await interaction.editReply({ content: 'Confirmation not received, cancelling', components: [] });
			console.error("ERROR ERROR ERROR!!!! " + e)
		}
	},
};