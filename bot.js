// Run dotenv
require('dotenv').config();
const Discord = require('discord.js');
const { VoiceConnectionStatus } = require('@discordjs/voice');
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const { Client, GatewayIntentBits, SlashCommandAssertions } = require('discord.js');
const fs = require("fs")
const {Player } = require("discord-player")
const LOAD_SLASH = process.argv[2] == "load"
const CLIENT_ID = "1048774145720201268"
const GUILD_ID = "752361739051597946"
const GUILD_ID_DND = "907009675088777318"
const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});
    client.slashcommands = new Discord.Collection()
    client.player = new Player(client,{ytdlOptions:{
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
    
});
client.player.on('connectionCreate', (queue) => {
    console.log("setup queue");
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
        if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
            queue.connection.voiceConnection.configureNetworking();
        }
    })
});
let commands = []
const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))

for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if(LOAD_SLASH) commands.push(slashcmd.data.toJSON())
    
}





if (LOAD_SLASH){
    const rest = new REST({version: "10"}).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID),{body: commands})
    rest.put(Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID_DND),{body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else{
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    client.on("interactionCreate",(interaction) =>{
        async function handleCommand(){
        if (!interaction.isCommand()) return
        const slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) interaction.reply("Not a valid slash command")

        await interaction.deferReply()
        await slashcmd.run({client, interaction})
        }
        handleCommand()
    })
    client.login(process.env.DISCORD_TOKEN);
}




//client.on('ready', () => {
    //console.log(`Logged in as ${client.user.tag}!`);
//});




//client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
  });

  // Reply to a user who mentions the bot
client.on('messageCreate', message => {
   // console.log(`I see a message!`);
  
});

