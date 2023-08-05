const { DBName, BaseTable, WLtable } = require("../configs/config.json")
const { authorized_gouvernment } = require("./privilegied")
const { getOpt } = require("./getOpt")

module.exports = {
    playerbase: (it, DB) => {

        const id = getOpt(it, "id")
        const x = parseFloat(getOpt(it, "pos_x"))
        const y = parseFloat(getOpt(it, "pos_y"))

        let flag = false
        authorized_gouvernment.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                // check if position are in map
                if (x <= 0.0) it.reply("La position X fournie est plus petite ou égale à 0")
                else if (y <= 0.0) it.reply("La position Y fournie est plus petite ou égale à 0")
                else if (x >= 15358.0) it.reply("La position X fournie est trop grande")
                else if (y >= 15358.0) it.reply("La position Y fournie est trop grande")
                else {
                    DB.db(DBName).collection(WLtable).findOne({"discordID": id})
                    .then((doc=>{
                        if(!doc) it.reply("Cet identifiant discord n'est pas dans la WhiteList")
                        else{
                            //L'id a été trouvé on va insérer le doc
                            const date = new Date()
                            let minutes
                            if (date.getMinutes() < 10) minutes = `0${date.getMinutes()}`
                            else minutes = `${date.getMinutes()}`
                            const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  --  ${date.getHours()}:`+ minutes
                            // Check si quelqu'un possède déjà le batiment
                            DB.db(DBName).collection(BaseTable).findOne({"X": x, "Y": y})
                            .then((doc)=>{
                                if(doc) it.reply("Une base existe déjà à cette position et appartient à <@"+ doc.id + "> depuis le " + doc.date + " enregistré par " + doc.staff )
                                else{
                                    DB.db(DBName).collection(BaseTable).findOne({"id": id})
                                    .then((doc)=>{
                                        if(doc) it.reply("Ce joueur possède dejà une base à "+ doc.X +", "+ doc.Y+ " depuis le " + doc.date + " enregistré par " + doc.staff )
                                        else{
                                            DB.db(DBName).collection(BaseTable).insertOne({"id": id, "X":x, "Y": y, "date": today, "staff": `${it.user.toString()}`})
                                            .then(()=>{
                                                it.reply("La base a été correctement ajouté")
                                            })
                                            .catch((err)=>{
                                                console.log(err)
                                                it.reply("une erreur est survenue pendant l'insertion de la base")
                                            })
                                        }
                                    })
                                    .catch((err)=>{
                                        it.reply("Une erreur est survenue pendant la lecture des bases (2)")
                                        console.log(err)
                                    })
                                }
                            })
                            .catch((err)=>{
                                it.reply("Une erreur est survenue pendant la lecture des bases (1)")
                                console.log(err)
                            })
                        }
                    }))
                    .catch((err)=>{
                        it.reply("Une erreur est survenue pendant la lecture de la WhiteList")
                        console.log(err)
                    })
                }
            }
        })
        if(!flag) it.reply("Vous n'avez pas l'autorisation de faire celà")
    },

    removebase: (it, DB) => {

        const id = getOpt(it, "id")

        let flag = false
        authorized_gouvernment.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                DB.db(DBName).collection(BaseTable).deleteOne({"id": id})
                .then(()=>{
                    it.reply("La base de <@"+id+"> a été correctement supprimée de la DB")
                })
                .catch((err)=>{
                    it.reply("Une erreur est survenue pendant la suppression de la base")
                    console.log(err)
                })
            }
        })
        if(!flag) it.reply("Vous n'avez pas l'autorisation de faire celà")
    }
}