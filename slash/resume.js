const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Let's start the music again!"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")
		new EmbedBuilder
		queue.setPaused(false)
        await interaction.editReply({
			embeds: [new EmbedBuilder().setDescription(
			`Music has been resumed`)
		],
	})
		

	},
}
