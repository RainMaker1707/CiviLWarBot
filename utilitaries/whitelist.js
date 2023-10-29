const DS = require('discord.js')
const { authorized, whitelisted, nonwhitelisted } = require('./privilegied')
const CFG = require('../configs/config.json')
const { log } = require("./log")
const fs = require('fs')

module.exports = {
    whitelistCmd: async (bot, it, DB) => {
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
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
                        const date = new Date()
                        let minutes
                        if (date.getMinutes() < 10) minutes = `0${date.getMinutes()}`
                        else minutes = `${date.getMinutes()}`
                        const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  --  ${date.getHours()}:`+minutes
                        DB.db(CFG.DBName).collection(CFG.WLtable).insertOne({"discordID": discord_id, "steamID": steam_id, "date": today, "staff":`${it.user.toString()}`})
                        .catch((err) => {
                            if(err) it.reply("Une erreur est survenur pendant l'insertion dans la whitelist")
                        })
                        .then(async ()=>{
                            log(bot, "Whitelisted SteamID: " + steam_id, " DiscordID: " + discord_id + " by: " + it.user.username)
                            
                            const toWhite = it.guild.members.fetch(discord_id)
                            toWhite.then(async (member)=> {
                                await member.roles.remove(nonwhitelisted);
                                await member.roles.add(whitelisted);
                            })
                            
                            fs.writeFile('../CivilWar95/Profiles/ServerProfile/CW95/Data/whitelist.txt', steam_id+'\n', {flag: 'a+'}, err=>{if(err)log(bot, err)})

                            it.reply("La whitelist a bien été enregistrée")
                            bot.channels.fetch("1131632380390674473").then((chan)=>{
                                bot.users.fetch(discord_id).then((user)=>{
                                    const date = new Date()
                                    let minutes
                                    if (date.getMinutes() < 10) minutes = `0${date.getMinutes()}`
                                    else minutes = `${date.getMinutes()}`
                                    const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  --  ${date.getHours()}:`+minutes
                                    chan.send("ID Discord: "+ discord_id + "\nID Steam: "+ steam_id + "\nTag Discord: "+ `${user.toString()}` + "\nDate: "+ today +"\nWL par: "+`${it.user.toString()}`)
                                })
                            })
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