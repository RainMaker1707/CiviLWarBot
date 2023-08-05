const { authorized } = require('./privilegied')
const CFG = require('../configs/config.json')
const DS = require("discord.js")
const fs = require('fs')
const { getOpt } = require("./getOpt")

module.exports = {
    save_bg: (it, DB) => {
        //TODO: PDF and other files
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                const id = getOpt(it, "id")
                DB.db(CFG.DBName).collection(CFG.WLtable).findOne({discordID: id})
                .catch((err) => it.reply("Une erreur est apparue pendant la lecture de la DB"))
                .then((doc) => {
                    if(!doc) it.reply("Ce discord ID n'est pas connu dans la WL")
                    else{
                        let last_name, first_name, background
                        it.options._hoistedOptions.forEach((opt)=>{
                            switch(opt.name){
                                case "prenom": first_name = opt.value; break;
                                case "nom": last_name = opt.value; break;
                                case "background": background = opt.value; break;
                            }
                        })
                        const toInsert = {
                            "discordID": id,
                            "prenom": first_name,
                            "nom": last_name,
                            "background": background
                        }
                        DB.db(CFG.DBName).collection(CFG.BGtable).insertOne(toInsert)
                        .catch((err)=>it.reply("Une erreur est survenue pendant l'insertion du BG"))
                        .then(()=>it.reply("Le background a été correctement sauvegarder"))
                    }
                })
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a effectué cette action")
    },
    get_bg: (bot, it , DB) => {
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                const id = getOpt(it, "discord_id")
                DB.db(CFG.DBName).collection(CFG.BGtable).findOne({discordID: id})
                .catch((err) => it.reply("Une erreur est survenue pendant la lecture de la DB des background"))
                .then((doc) => {
                    if(!doc) it.reply("Aucun document trouvé pour cet ID discord")
                    else {
                        let name = doc.prenom +", "+ doc.nom
                        let bg = doc.background
                        if(bg.length < 1500){
                            bot.users.fetch(doc.discordID).then((u)=>{
                                it.reply("Background de " + u.username + " jouant " + name + "\n\n" + bg)
                            })
                        } else {
                            bot.users.fetch(doc.discordID).then((u)=>{
                                fs.writeFileSync("background.txt", bg, {flag: 'w+'}, err=>{if(err)console.log(err)})
                                it.reply("Ok").then(msg => {
                                    setTimeout(() => msg.delete(), 0)
                                });
                                bot.channels.fetch(it.channel.id).then((chan) => {
                                    chan.send("Background de " + u.username + " jouant " + name)
                                    chan.send({files: ["./background.txt"]})
                                })
                            })
                        }
                    }
                })
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a effectué cette action")
    }
}