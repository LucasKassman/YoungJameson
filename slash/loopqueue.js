const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("loopqueue").setDescription("I will loop the whole queue for you!"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
		if (!queue) return await interaction.editReply("There are no songs in the queue")
		const song = queue.current
		
			queue.setRepeatMode(2)
			await interaction.editReply({
				embeds: [new EmbedBuilder()
					.setThumbnail(song.thumbnail)
					.setDescription(`Looping Queue, starting with [${song.title}](${song.url})\n\n`)
				],
		})
		

	
			

		
        
		

	},
}
