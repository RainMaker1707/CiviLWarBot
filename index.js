// external libraries
const DS = require('discord.js');
const { Client, GatewayIntentBits, Partials, Events} = require('discord.js');
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
const { whitelisted, nonwhitelisted } = require('./utilitaries/privilegied')
const { customPass } = require("./utilitaries/passeportDiscord")
const { customPass2 } = require("./utilitaries/passeportSteam")
const { get_DS_id, get_steam_id } = require("./utilitaries/getDSid")
const { save_bg, get_bg } = require("./utilitaries/background")

let bot = new Client({intents: [
                                GatewayIntentBits.DirectMessages, 
                                GatewayIntentBits.Guilds,
		                        GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                                GatewayIntentBits.GuildMembers,
                                GatewayIntentBits.GuildMessageReactions,
                                GatewayIntentBits.DirectMessageReactions,
                                GatewayIntentBits.GuildVoiceStates,
                                GatewayIntentBits.GuildPresences
                            ],
                      partials: [Partials.Message, Partials.Channel, Partials.Reaction]
                    })

let DB = new MongoClient('mongodb://127.0.0.1:27017')

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command);
}


const rest = new REST({version: '9'}).setToken(CFG.token);


bot.on("ready",  ()=>{
    console.log("Ready..... V1.03")
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

    ticketGlobal(bot, "📄🛃┃𝐖𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭 𝐍°", "1113446931591602206", "Lisez bien le "+ DS.channelMention("1113445219598340118") + ", ensuite le " + DS.channelMention("1113447196147322930") + " et les "+ DS.channelMention("1114495713766809672") + " pour vous imprégner du monde de CivilWar 95.\nN'oubliez pas de nous donner votre SteamID et de vous renommer sur discord avec le prénom et le nom de votre personnage.\n\nMerci de patienter, un staff va prendre contact avec vous d'ici peu.")
    ticketGlobal(bot, "📄📕┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐀°", "1113937575950954557", 
            "Comment pouvons nous vous aider?\nNous répondrons dés que possible")
    ticketGlobal(bot, "📄📗┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐁°", "1114274262442844281", 
            "Raconte nous l'histoire de ton personnage.\nNous traiterons ta demande le plus vite possible!")
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
        case "bg": save_bg(it, DB); break;
        case "get_bg": get_bg(bot, it, DB); break;
        case "freq": radioCmd(bot,it); break;
        case "pass_ds": customPass(bot, it, DB); break;
        case "pass_steam": customPass2(bot, it, DB); break;
        case "ds_id": get_DS_id(bot, it ,DB); break;
        case "steam_id": get_steam_id(bot, it, DB); break;
        case "call": console.log(command); break;
        case "ban": console.log(command); break;
    }
})


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


bot.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.message.id === CFG.LastRuleMsg && (reaction.emoji.name == "✅" || reaction.emoji.name == "☑️")) { //check if it is rules and it check it
        const toWhite = bot.guilds.cache.get(reaction.message.guildId).members.fetch(user.id)
        toWhite.then(async (member)=> {
            if(!member._roles.includes(whitelisted)){
                await member.roles.add(nonwhitelisted);
            }
        })
    }
})
