const DS = require('discord.js');
const { ComponentType } = require('discord.js');
const { answer } = require("./ticketAnswer");


module.exports = {
    ticketGlobal: (bot, name, id, message) => { 
        const channelColl = bot.channels.fetch(id)
        channelColl.then((chan)=>{
            const collector = chan.createMessageComponentCollector({
                componentType: ComponentType.Button,
            });
    
            collector.on("collect", (it)=>{
                answer(it, name, message, bot, id);
            })
        })  
    }
}