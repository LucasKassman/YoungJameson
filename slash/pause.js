const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("I will stop playing the song, for now"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")
		
		queue.setPaused(true)
        await interaction.editReply({
			embeds: [new EmbedBuilder().setDescription(
			`Music has been paused!`)
		],
	})
	},
}