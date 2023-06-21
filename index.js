const DS = require('discord.js');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');
const CFG = require('./configs/config.json');
const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {MongoClient, ObjectId} = require('mongodb');
const fs = require('node:fs');
const { isatty } = require('node:tty');

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
let wlcounter = 0

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
    const channelColl = await bot.channels.cache.find(channel => channel.id === "1113446931591602206")
    const collector = channelColl.createMessageComponentCollector({
        componentType: ComponentType.Button,
    });
    
    collector.on("collect", async (it)=>{
        let everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
        let whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
        let nonwhite = await it.guild.roles.cache.find(r => r.id === '1113453224133939210')
        channelName = "WhiteList N°" + ++wlcounter
        const channel = await it.member.guild.channels.create({
            name: channelName,
            type: DS.ChannelType.GuildText,
            parent: channelColl.parent, 
            permissionsOverwrites:[
                {
                    id: everyoneRole,
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: whitelist,
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: nonwhite,
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: it.user,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                }
            ]
        })
        channel.send(`${it.user.toString()}`)

        console.log("Channel '"+ channelName +"' created")
        it.reply("Channel " + channel.toString() +" created").then(msg => {
            setTimeout(() => msg.delete(), 10000)
          });
    })
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


/*
const color = 0xFC2D00

    const EmbedRPDeath = new EmbedBuilder()
        .setColor(color)
        .setTitle('Déclarer sa mort')
        .setDescription('Cliquer sur le bouton pour ouvrir un channel dans lequel vous nous expliquerez comment vous etes mort ou monter un dossier de mort RP')

    const EmbedWL = new EmbedBuilder()
        .setColor(color)
        .setTitle('Demande de Whitelist')
        .setDescription('Description de la WL: ...')

    const EmbedSupport = new EmbedBuilder()
        .setColor(color)
        .setTitle('Demande de support')
        .setDescription('Créer un tiket et expliquer nous votre problème')

    const EmbedBackground = new EmbedBuilder()
        .setColor(color)
        .setTitle('Création de personnage')
        .setDescription("Créer un tiket et raconter nous l'histoire de votre personnage")


    bot.channels.cache.find(channel => channel.id ===  "1113446931591602206").send({ 
        embeds: [EmbedWL],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Create Ticket",
                    custom_id: "wl_ticket"
                }]
            }
        ]
    })
    

    bot.channels.cache.find(channel => channel.id === "1113937575950954557" ).send({ 
        embeds: [EmbedSupport],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Create Ticket",
                    custom_id: "support_ticket"
                }]
            }
        ]
    })

    bot.channels.cache.find(channel => channel.id === "1114274262442844281" ).send({ 
        embeds: [EmbedBackground],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Create mon perso",
                    custom_id: "background_ticket"
                }]
            }
        ]
    })

    bot.channels.cache.find(channel => channel.id === "1114274956566605874" ).send({ 
        embeds: [EmbedRPDeath],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Déclarer sa mort",
                    custom_id: "rp_death_ticket"
                },
                {
                    type: 2,
                    style: 4,
                    label: "Dossier mort RP",
                    custom_id: "death_ask_ticket"
                }
                ]
            }
        ]
    })
    */