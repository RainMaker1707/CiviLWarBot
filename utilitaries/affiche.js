const { authorized } = require("./privilegied")
const { getOpt } = require("./getOpt")
const { AfficheChannel } = require("../configs/config.json")

module.exports = {
    accept: (bot, it)=>{
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                const id = getOpt(it, "author_id")
                const link = getOpt(it, "link")
                const text = getOpt(it, "text")

                bot.channels.fetch(AfficheChannel).then((chan)=>{
                    if(text) chan.send("*" + text + "*")
                    chan.send({files: [link]})
                    bot.users.fetch(id).then((user)=>{
                        user.send("Cette affiche a été acceptée")
                        user.send({files: [link]})
                        it.reply("L'affiche a été acceptée par "+ it.user.toString())
                    })
                })
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a faire cette action")
    },
    refuse: (bot, it)=>{
        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                const id = getOpt(it, "author_id")
                const link = getOpt(it, "link")
                const reason = getOpt(it, "reason")
                bot.users.fetch(id).then((user)=>{
                    user.send("Cette affiche a été refusé pour la raison suivante:\n- "+reason)
                    user.send({files: [link]})
                    it.reply("L'affiche a été refusée par "+ it.user.toString()+"\nRaison: "+reason)
                })
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a faire cette action")
    }
}