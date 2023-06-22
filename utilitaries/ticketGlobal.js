const DS = require('discord.js');
const { ComponentType } = require('discord.js');
const { answer } = require("./ticketAnswer");

let counter = 0

module.exports = {
    ticketGlobal: async (bot, name, id, message) => { 
        const channelColl = await bot.channels.cache.find(channel => channel.id === id)
        const collector = channelColl.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });

        collector.on("collect", async (it)=>{
            answer(it, name, message, bot, id);
        })  
    }
}