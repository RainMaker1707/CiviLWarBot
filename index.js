// external libraries
const DS = require('discord.js');
const { Client, GatewayIntentBits} = require('discord.js');
const CFG = require('./configs/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MongoClient } = require('mongodb');
const fs = require('node:fs');

// Utilitaries commands defined internally
const { createTicket, createTicketBackground, createTicketDeath, createTicketHelp, createTicketWL} = require('./utilitaries/tickets')
const { ticketGlobal } = require('./utilitaries/ticketGlobal');

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

    if(CFG.createTicketWL && CFG.createTicketDeath && CFG.createTicketHelp && CFG.createTicketBackground){
        createTicket(bot);
    }else {
        if(CFG.createTicketWL) createTicketWL(bot)
        if(CFG.createTicketDeath) createTicketDeaths(bot)
        if(CFG.createTicketBackground) createTicketBackground(bot)
        if(CFG.createTicketHelp) createTicketHelp(bot)
    }

    ticketGlobal(bot, "📄🛃┃𝐖𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭 𝐍°", "1113446931591602206", "")
    ticketGlobal(bot, "📄📕┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐀°", "1113937575950954557", 
            " Comment pouvons nous vous aider?\nNous répondrons dés que possible")
    ticketGlobal(bot, "📄📗┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐁°", "1114274262442844281", 
            " Raconte nous l'histoire de ton personnage.\nNous traiterons ta demande le plus vite possible!")
    
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