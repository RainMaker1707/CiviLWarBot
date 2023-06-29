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
const { ticketDeath } = require('./utilitaries/ticketDeath');
const { closeCmd } = require("./utilitaries/close");
const { whitelistCmd } = require('./utilitaries/whitelist');
const { radioCmd } = require('./utilitaries/radio');

let bot = new Client({intents: [
                                GatewayIntentBits.DirectMessages, 
                                GatewayIntentBits.Guilds,
		                        GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                                GatewayIntentBits.GuildMembers,
                                GatewayIntentBits.DirectMessageReactions,
                                GatewayIntentBits.GuildVoiceStates,
                                GatewayIntentBits.GuildPresences
                            ]})

let DB = new MongoClient('mongodb://127.0.0.1:27017')

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
        if(CFG.createTicketDeath) createTicketDeath(bot)
        if(CFG.createTicketBackground) createTicketBackground(bot)
        if(CFG.createTicketHelp) createTicketHelp(bot)
    }

    ticketGlobal(bot, "📄🛃┃𝐖𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭 𝐍°", "1113446931591602206", " Lisez bien le reglement, ensuite le lore et les factions pour vous imprégnez du monde de CivilWar.\nN'oubliez pas de nous donnez votre steam ID")
    ticketGlobal(bot, "📄📕┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐀°", "1113937575950954557", 
            " Comment pouvons nous vous aider?\nNous répondrons dés que possible")
    ticketGlobal(bot, "📄📗┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐁°", "1114274262442844281", 
            " Raconte nous l'histoire de ton personnage.\nNous traiterons ta demande le plus vite possible!")
    ticketDeath(bot, "1114274956566605874")
    
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

bot.on('interactionCreate', async (it)=>{
    if(!it.isCommand()) return;
    const command = it.commandName
    switch(command){
        case "wl": whitelistCmd(bot, it, DB); break;
        case "close": closeCmd(bot, it); break;
        case "bg": console.log(command); break;
        case "freq": radioCmd(bot,it); break;
        case "call": console.log(command); break;
        case "ban": console.log(command); break;
    }
})

//TODO: delete the radio channel when empty
bot.on("voiceStateUpdate", async (oldMember, newMember) => {
    if (oldMember.channel) {
        const  category_id = "1113447004425687191"
        const floats = (ch) => parseFloat(ch.name.split('┃')[1])
        let filter = (ch) =>{
            return (ch.parentId == category_id)
            && (floats(ch) >= 80.0 && floats(ch) <= 180.0)
            && (oldMember.channel == ch.id)
            && (oldMember.channel.members.size == 0)
        }
        return oldMember.guild.channels.cache
            .filter(filter)
            .forEach((ch) => ch.delete()
            .catch(console.error));
    }
})
