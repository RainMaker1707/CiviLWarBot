const DS = require('discord.js');
const { Client, GatewayIntentBits} = require('discord.js');
const CFG = require('./configs/config.json');
const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MongoClient } = require('mongodb');
const fs = require('node:fs');
const { createTicket, createTicketBackground, createTicketDeath, createtTicketHelp, createTicketWL} = require('./utilitaries/tickets')
const { ticketWL } = require("./utilitaries/ticketWLCollector")

let bot = new Client({intents: [
                                GatewayIntentBits.DirectMessages, 
                                GatewayIntentBits.Guilds,
		                        GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                                GatewayIntentBits.GuildMembers,
                                GatewayIntentBits.DirectMessageReactions,
                            ]})

let DB = new MongoClient('mongodb://localhost')

let counter = 0

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command);
}


const rest = new REST({version: '9'}).setToken(CFG.token);

bot.on("ready",  ()=>{
    console.log("Ready.....")
});

bot.login(CFG.token).then(async ()=> {

    await DB.connect();
    console.log("Connected ....");

    if(CFG.createTicket){
        createTicket(bot);
    }
    ticketWL(bot)
    
});


(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(CFG.clientId, CFG.guildId),
            {body: commands}
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();


bot.on("message", (message) => {
    console.log(message)
})