const { DBName, WarnTable } = require("../configs/config.json")
const { authorized } = require("./privilegied")
const { getOpt } = require("./getOpt")
const { log } = require("./log")
//const { playerinfo } = require("./playerinfo")


module.exports = {
    warn: (bot, it, DB) => {

        const id = getOpt(it, "discord_id")
        const reason = getOpt(it, "reason")

        const date = new Date()
        let minutes
        if (date.getMinutes() < 10) minutes = `0${date.getMinutes()}`
        else minutes = `${date.getMinutes()}`
        const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  --  ${date.getHours()}:`+ minutes

        let flag = false
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                DB.db(DBName).collection(WarnTable).insertOne({"id": id, "reason": reason, "date": today, "staff": `${it.user.toString()}`})
                .then(()=>{
                    
                    bot.users.fetch(id).then((user)=>{
                        DB.db(DBName).collection(WarnTable).count({"id": id}).then((doc)=>{
                            let av = "avertissement"
                            if(doc > 1) av = "avertissements"
                            it.reply("Le warning de <@"+ id + "> pour raison: \"" + reason + "\" a été correctement enregistré par " + `${it.user.toString()}` 
                                    + "\nTotal: " + doc + " " + av + ".")
                            user.send("Le staff vous a adressé un avertissement pour la raison suivante: \"" + reason + "\".\n Vous avez un total de "+ doc + " " + av + ".\n"
                                        + "Nous vous rappellons qu'au bout du 3ème avertissement vous pourriez être banni du serveur.")
                        })
                    })
                })
                .catch((err)=>{
                    log(bot, err)
                    it.reply("Une erreur est survenue pendant l'insertion du warning")
                })
            }
        })
        if (!flag) it.reply("Vous n'avez pas l'autorisation de faire celà")
    }
}