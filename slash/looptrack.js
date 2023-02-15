const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("looptrack").setDescription("I'll just loop the current song"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
		currentPlaying = client.player.current
		if (!queue) return await interaction.editReply("There are no songs in the queue")
		if (!currentPlaying) return await interaction.editReply("There are no songs in the queue")
		const song = queue.current
		
			queue.setRepeatMode(1)
			await interaction.editReply({
				embeds: [new EmbedBuilder()
					.setThumbnail(song.thumbnail)
					.setDescription(`Looping [${song.title}](${song.url})\n\n`)
				],
		})
		

	
			

	
        
		

	},
}
