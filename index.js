// external libraries
const DS = require('discord.js');
const { Client, GatewayIntentBits, Partials, Events} = require('discord.js');
const CFG = require('./configs/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { MongoClient } = require('mongodb');
const fs = require('node:fs');

// Utilitaries commands defined internally
const { createTicket, createTicketBackground, createTicketDeath, createTicketHelp, createTicketWL, createTicketHousing} = require('./utilitaries/tickets')
const { ticketGlobal } = require('./utilitaries/ticketGlobal');
const { ticketDeath } = require('./utilitaries/ticketDeath');
const { closeCmd } = require("./utilitaries/close");
const { whitelistCmd } = require('./utilitaries/whitelist');
const { radioCmd } = require('./utilitaries/radio');
const { whitelisted, nonwhitelisted, admin } = require('./utilitaries/privilegied')
const { customPass } = require("./utilitaries/passeportDiscord")
const { customPass2 } = require("./utilitaries/passeportSteam")
const { get_DS_id, get_steam_id } = require("./utilitaries/getDSid")
const { save_bg, get_bg } = require("./utilitaries/background")
const { playerbase, removebase} = require("./utilitaries/playerbase")
const { warn } = require("./utilitaries/warning")
const { playerinfo } = require("./utilitaries/playerinfo")
const { accept, refuse} = require("./utilitaries/affiche")
const { addgarage, removegarage } = require("./utilitaries/garage")
const { release } = require("./utilitaries/release");
const { log } = require("./utilitaries/log")

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

const webHook = new DS.WebhookClient({url: CFG.webhooktransmission})

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command);
}


const rest = new REST({version: '9'}).setToken(CFG.token);


bot.on("ready",  ()=>{
    log(bot, "Ready..... V1.21")

    let count = 0

    // Make a list of users connected to voice channel in CivilWar95
    setInterval( ()=>{
        bot.guilds.fetch("1113445147707981834").then(async(guild)=>{
            const path = '../CivilWar95/Profiles/ServerProfile/CW95/Data/discord_online.txt'
            fs.writeFileSync(path, "", {flag: 'w+'}, err=>{if(err)log(bot, err)})
            guild.members.cache.sort().forEach(member => {
                DB.db(CFG.DBName).collection(CFG.WLtable).findOne({"discordID": member.id}).then((doc)=>{
                    if(doc){
                        if(member.voice.channel) {
                            if(member._roles.includes(admin)) {
                                fs.appendFileSync(path, doc.steamID+"|ADMIN"+"\n")
                            } else {
                                fs.appendFileSync(path, doc.steamID+"|"+member.nickname+"\n")
                            }
                        }
                    }
                })
                .catch((err)=>log(bot, err))
            })
        })
    }, 5000)


    setInterval( ()=>{
        // here count number of line in online.txt
        const path = '../CivilWar95/Profiles/ServerProfile/CW95/Data/online.txt'

        fs.readFile(path, 'utf-8', (err, data)=>{
            if (err) log(bot, err)
            else {
                let count = 0
                for(let i = 0; i < data.length; i++){
                    if ( data[i] == "\n") count ++
                }
                bot.user.setPresence({
                    activities:[{
                        type: DS.ActivityType.Watching,
                        name: count + " joueurs en ligne" // here is the real status string
                    }],
                    status: ""
                })
            }
        })
    }, 5000)

    //send a message for topserveur votes in discussion channel hrp interval 2h
    setInterval(()=>{
        bot.channels.fetch("1113940473707507743")
        .then((chan)=>{
            chan.send("📩 N'oubliez pas de votez pour le serveur ➡️ https://top-serveurs.net/dayz/cw95 \n Merci à vous! 💜")
        })
    }, 7200000) //2h

});


bot.login(CFG.token).then(async ()=> {

    await DB.connect();
    log(bot, "Bot is now live");

    if(CFG.createTicketWL && CFG.createTicketDeath && CFG.createTicketHelp && CFG.createTicketBackground){
        createTicket(bot);
    }else {
        if(CFG.createTicketWL) createTicketWL(bot)
        if(CFG.createTicketDeath) createTicketDeath(bot)
        if(CFG.createTicketBackground) createTicketBackground(bot)
        if(CFG.createTicketHelp) createTicketHelp(bot)
        if(CFG.createTicketHousing) createTicketHousing(bot)
    }

    ticketGlobal(bot, "📄🛃┃𝐖𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭-𝐍°", "1113446931591602206", "Lisez bien le "+ DS.channelMention("1113445219598340118") + ", ensuite le " + DS.channelMention("1113447196147322930") + " et les "+ DS.channelMention("1114495713766809672") + " pour vous imprégner du monde de CivilWar 95.\nN'oubliez pas de nous donner votre SteamID et de vous renommer sur discord avec le prénom et le nom de votre personnage.\n\nMerci de patienter, un staff va prendre contact avec vous d'ici peu.")
    ticketGlobal(bot, "📄📕┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐀°", "1113937575950954557", 
            "Comment pouvons nous vous aider?\nNous répondrons dés que possible")
    ticketGlobal(bot, "📄📗┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐁°", "1114274262442844281", 
            "Raconte nous l'histoire de ton personnage.\nNous traiterons ta demande le plus vite possible! \n**Vous ne pouvez pas rejoindre d'office"
            +" une faction depuis votre background. Vous serez de toute façon réorienté vers les membres en vue d'une postulation suite à une scène"
            +" RP et ces joueurs décideront ou non de vous intégrer**")
    ticketDeath(bot, "1114274956566605874")
    ticketGlobal(bot, "📄🏡┃𝐀𝐜𝐡𝐞𝐭𝐞𝐫-𝐮𝐧-𝐥𝐨𝐠𝐞𝐦𝐞𝐧𝐭-𝐍°", "1136400543250661518", "Vous pouvez créer un ticket dans cette section pour demander à vous installer quelque part.\n\n"
            + "⚠️ *Pour les premières semaines suivant le lancement du serveur, il n'est possible d'emménager uniquement **que dans Zelenogorsk** intra-muros.*\n\n"
            + "Les 💵 **tarifs** des logements sont consultables dans le canal ci-dessous: \n    " + DS.channelMention("1150545043602542602") + "\n"
            + " - Il vous est possible d'acheter une place de 🚗 **garage** pour 10.000 **Hryvnia**\n"
            + "- Merci d'écrire les coordonnées du bien souhaité dans votre ticket (visibles sur le site https://www.izurvive.com/)\n"
            + "- Le **staff** qui s'occupe de votre ticket vous donnera ensuite un **codelock** (deux maximum si deux entrées)"
            + " et des **kits de construction** (porte & barricades de fenêtres). Les composants de fabrication sont à votre charge.\n"
            + "- Un joueur ne peut posséder **qu'un seul logement et un seul garage**.\n"
            + "- Pour rappel, **il est interdit de posséder deux meubles identiques et déployés** (peu importe la couleur) dans son logement."
            + " La seule exception concerne les caisses en bois craftables. Outrepasser cette règle mènera à la suppression des meubles concernés.\n"
            + "- Notez que le temps de traitement de votre demande peut varier en fonction de la disponibilité des membres du staff. Par ailleurs,"
            + " il est inutile d'essayer de les contacter par MP pour tenter accélérer la procédure.")
    
});

/*bot.on('uncaughtException', err=>{
    
})*/


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

function logError(err, cmd, it){
    bot.channels.fetch("1155091637412823090").then(chan=>chan.send("**BOT ERROR WITH COMMAND \"" + cmd +"\":**\n" + err + "\n\n" 
                                                                    + it.user.username + ": /" + it.commandName + " command with options ->" +  it.options._hoistedOptions))
    it.reply("Error check logs")
}


bot.on('interactionCreate', async (it)=>{
    if(!it.isCommand()) return;
    const command = it.commandName
    log(bot, it.commandName + " ==> " + it.user.username) 
    switch(command){
        case "wl": try { whitelistCmd(bot, it, DB); } catch(err) {logError(err, "WL", it)} break;
        case "close": try { closeCmd(bot, it);  } catch(err) {logError(err, "CLOSE", it)} break;
        case "bg": try { save_bg(it, DB); } catch(err) {logError(err, "BG", it)} break;
        case "get_bg": try { get_bg(bot, it, DB);  } catch(err) {logError(err, "GET_BG", it)} break;
        case "freq": try { radioCmd(bot,it);  } catch(err) {logError(err, "FREQ", it)} break;
        case "pass_ds": try { customPass(bot, it, DB); } catch(err) {logError(err, "PASS_DS", it)} break;
        case "pass_steam": try { customPass2(bot, it, DB); } catch(err) {logError(err, "PASS_STEAM", it)} break;
        case "ds_id": try { get_DS_id(bot, it ,DB);  } catch(err) {logError(err, "DS_ID", it)} break;
        case "steam_id": try { get_steam_id(bot, it, DB);  } catch(err) {logError(err, "STEAM_ID", it)} break;
        case "playerbase": try { playerbase(it, DB);  } catch(err) {logError(err, "PLAYER_BASE", it)} break;
        case "playerinfo": try { playerinfo(it, DB);  } catch(err) {logError(err, "PLAYER_INFO", it)} break;
        case "removebase": try { removebase(it, DB);  } catch(err) {logError(err, "REMOVE_BASE", it)} break;
        case "warn": try { warn(bot, it, DB);  } catch(err) {logError(err, "WARN", it)} break;
        case "accept": try { accept(bot, it);  } catch(err) {logError(err, "ACCEPT", it)} break;
        case "refuse": try { refuse(bot, it);  } catch(err) {logError(err, "REFUSE", it)} break;
        case "add_garage": try { addgarage(it ,DB);  } catch(err) {logError(err, "ADD_GARAGE", it)} break;
        case "remove_garage": try { removegarage(it, DB);  } catch(err) {logError(err, "REMOVE_GARAGE", it)} break;
        case "release": try { release(bot, it);  } catch(err) {logError(err, "RELEASE", it)} break;
        case "call": try { console.log(command);  } catch(err) {logError(err, "CALL", it)} break;
        case "ban": try { console.log(command);  } catch(err) {logError(err, "BAN", it)} break;
        case "error": try { throw new Error("ERROR TEST"); } catch (err) {logError(err, "TEST_ERROR_LOG", it)} break;
        case "ping": try { it.reply("Pong!") } catch(err) {logError(err, "ALIVE", it)} break;
    }
})


bot.on("voiceStateUpdate", async (oldMember, newMember) => {
    const faction_freq = [36.425, 37.650, 73.475]
    if (oldMember.channel) {
        const  category_id = "1152564280458231808" //transmission radio cat
        const floats = (ch) => parseFloat(ch.name.split('┃')[1])
        let filter = (ch) =>{
            return (ch.parentId == category_id)
            && ((floats(ch) >= 80.0 && floats(ch) <= 180.0) || (faction_freq.includes(floats(ch))))
            && (oldMember.channel == ch.id)
            && (oldMember.channel.members.size == 0)
            && ((floats(ch) != 113.7) && (floats(ch) != 102.2) && (floats(ch) != 100.5) && (floats(ch) != 87.2) && (floats(ch) != 85.5) )
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
            log(bot, member.user.username + " has accepted rules")
            if(!member._roles.includes(whitelisted)){
                await member.roles.add(nonwhitelisted);
            }
        })
    }
})

bot.on(Events.MessageCreate, (message)=>{
    if(message.channelId === CFG.AfficheChannel) {
        message.attachments.forEach((atch)=>{
            let url = atch.attachment
            bot.channels.fetch(CFG.AfficheValidation).then((chan)=>{
                if(message.author.id != CFG.BotID){
                    chan.send("Send by: "+message.author.toString()+"\n\nMessage: "+message.content)
                    chan.send({files: [url]})
                    message.delete()
                    message.author.send("Votre affiche est en cours de validation!")
                }
            })
        })
    } else if(message.guildId == null) {
        if (message.author.username == 'CivilWar1995') return
        else{
            bot.guilds.fetch(CFG.guildId).then((guild)=>guild.members.fetch(message.author.id).then((member)=>{
                start = 0, end = 1
                if(message.content.substring(start, end) !== '$') return
                if(message.content.substring(end).length == 0) message.reply("Vous ne pouvez pas envoyer de message vide")
                else if(message.content.substring(end).includes("www") || message.content.substring(end).includes("http") || message.content.substring(end).includes("/")) message.reply("Les URL sont interdites!")
                else if(!member.voice.channel) message.reply("Vous devez être dans un salon vocal pour utiliser les transmissions")
                else {
                    DB.db(CFG.DBName).collection(CFG.WLtable).findOne({"discordID": message.author.id}).then(async (doc)=>{
                        if(!doc) message.reply("Vous n'etes pas WL sur le serveur")
                        else{
                            let userColor 
                            let embed
                            text = message.content.substring(end).trimStart(" ").trimEnd(" ")
                            if(doc.color) {
                                userColor = doc.color
                                embed = new DS.EmbedBuilder()
                                        .setColor(userColor)
                                        .setDescription("\"*" + text +"*\"")
                            }else {
                                let flag = false
                                while(!flag){
                                    userColor = randomHexa()
                                    await DB.db(CFG.DBName).collection(CFG.WLtable).findOne({"color": userColor}, ).then((doc2)=>{
                                        if(!doc2) {
                                            flag = true
                                            DB.db(CFG.DBName).collection(CFG.WLtable).updateOne(doc, {$set:{"color":userColor}}).then(()=>{
                                                log(bot, 'updated color for ' + message.author.username + ' with ' + userColor)
                                            })
                                        }
                                    })
                                    await sleep(1000)
                                }
                                embed = new DS.EmbedBuilder()
                                        .setColor(userColor)
                                        .setDescription("\"*" + text +"*\"")
                            }
        
                            webHook.send({
                                username: 'ChRN - RadioKanal',
                                embeds: [embed]
                            }).then(msg => setTimeout(()=> {
                                bot.channels.fetch(CFG.transmissionChan).then((chan)=>{try{chan.messages.delete(msg.id)}catch(err){console.log("ERROR DELETING TRANSMISSION:\n" + err)}})
                            }, 1800000)) // 30m
        
                            bot.channels.fetch(CFG.logTranmission).then((chan)=>chan.send(message.author.username + ": " + message.content.substring(end)))
                        }
                    })
                }
            })) 
        }
    }
})


function randomHexa(){
    let num = ""
    while(num.length != 6) num = Math.floor(Math.random()*16777215).toString(16)
    return "#" + num
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}