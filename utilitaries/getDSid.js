const { authorized } = require('./privilegied')
const CFG = require('../configs/config.json')
const { getOpt } = require("./getOpt")


function getID(bot, it, DB, form){
    DB.db(CFG.DBName).collection(CFG.WLtable).findOne(form)
        .catch((err) => {
            if(err) it.reply("Une erreur est survenur pendant la lecture de la DB")
        })
        .then((doc)=>{
            if(!doc) it.reply("Aucun document trouver avec ces identifiants: " + form)
            else {
                bot.users.fetch(doc.discordID).then((u)=>{
                    it.reply("Steam_id: " + doc.steamID + "\nDiscord_id: " + doc.discordID + "\nUsername: " + u.username)
                })
            }
        })
    
}

module.exports = {
    get_DS_id: (bot, it, DB) => {
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                const id = getOpt(it, "steam_id")
                getID(bot, it, DB, {steamID: id})
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a effectué cette action")
    },
    get_steam_id: (bot, it , DB) => {
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                const id = getOpt(it, "discord_id")
                getID(bot, it, DB, {discordID: id})
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a effectué cette action")
    }
}