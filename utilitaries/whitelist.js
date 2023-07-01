const DS = require('discord.js')
const { authorized, whitelisted, nonwhitelisted } = require('./privilegied')
const CFG = require('../configs/config.json')

module.exports = {
    whitelistCmd: async (bot, it, DB) => {
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r)){
                flag = true
                let steam_id, discord_id
                it.options._hoistedOptions.forEach((opt)=>{
                    switch(opt.name){
                        case "steam-id": steam_id = opt.value; break;
                        case "discord-id": discord_id = opt.value; break;
                    }
                })
                DB.db(CFG.DBName).collection(CFG.WLtable).findOne({"discordID": discord_id, "steamID": steam_id})
                .then((doc) => {
                    if(doc != null) {
                        it.reply("Cette combinaison d'identifiant est déjà whitelist!")
                        return;
                    } 
                    else {
                        DB.db(CFG.DBName).collection(CFG.WLtable).insertOne({"discordID": discord_id, "steamID": steam_id})
                        .catch((err) => {
                            if(err) it.reply("Une erreur est survenur pendant l'insertion dans la whitelist")
                        })
                        .then(async ()=>{
                            console.log("Whitelisted SteamID: " + steam_id, " DiscordID: " + discord_id + " by: " + it.user.username)
                            
                            const toWhite = it.guild.members.fetch(discord_id)
                            toWhite.then(async (member)=> {
                                await member.roles.remove(nonwhitelisted);
                                await member.roles.add(whitelisted);
                            })
                            
                            it.reply("La whitelist a bien été enregistrée")
                        })
                    }
                })
                .catch((err) => {
                    if(err) it.reply("Une erreur est survenur pendant la lecture de la whitelist")
                })                 
            }
        })
        if(!flag) it.reply("Vous ne disposez pas de droit suffisant pour whitelist un joueur")
        
    }
}