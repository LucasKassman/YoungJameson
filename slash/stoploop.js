
const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("stoploop").setDescription("I will stop all looping!"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
		if (!queue) return await interaction.editReply("There are no songs in the queue")
		const song = queue.current






            queue.setRepeatMode(0)
			await interaction.editReply({
				embeds: [new EmbedBuilder()
					.setThumbnail(song.thumbnail)
					.setDescription(`Done looping [${song.title}](${song.url})\n\n`)
				],
		})
    },
}
