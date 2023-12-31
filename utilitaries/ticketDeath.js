const { ComponentType } = require('discord.js');
const { answer, answerDeath } = require("./ticketAnswer");


module.exports = {
    ticketDeath: (bot, id) => { 
        const channelColl = bot.channels.fetch(id)
        channelColl.then((chan)=>{
            const collector = chan.createMessageComponentCollector({
                componentType: ComponentType.Button,
            });
            collector.on("collect", (it)=>{
                switch (it.customId){
                    case "rp_death_ticket": answer(it, "📄📘┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐌°", "Comment etes vous mort? Une mort RP signifie un wipe du personnage et de son histoire, vous devrez impérativement en jouer un nouveau", bot, id); break;
                    case "death_ask_ticket": answerDeath(it, "📄📘┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐃°", "Déposer votre dossier de mort RP ici, nous le traiterons le plus vite possible", bot, id); break;
                }
            })
        })
    }
}