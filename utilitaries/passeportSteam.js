const { authorized_passport } = require('./privilegied')
const CFG = require('../configs/config.json')
const fs = require('fs')

module.exports = {
    customPass2: (bot, it, DB)=>{
        let flag = false
        authorized_passport.forEach((r)=>{
            if(it.member._roles.includes(r)){
                flag = true
                let steam_id, place, year, month, day
                it.options._hoistedOptions.forEach((opt)=>{
                    switch(opt.name){
                        case "id": steam_id = opt.value; break;
                        case "birthday": day = opt.value; break;
                        case "birthmonth": month = opt.value; break;
                        case "birthyear": year = opt.value; break;
                        case "birthplace": place = opt.value; break;
                    }
                })
                if(parseInt(day) > 31) it.reply("Le jour renseigné excède 31")
                else if(parseInt(day) <= 0) it.reply("Le jour renseigné ne peut aps être plus petit ou egal a 0")
                if(parseInt(month) > 12) it.reply("Le mois renseigné excède 12")
                else if(parseInt(month) <= 0) it.reply("Le mois renseigné ne peut aps être plus petit ou egal a 0")
                else DB.db(CFG.DBName).collection(CFG.WLtable).findOne({"steamID": steam_id}).then((doc)=>{
                    if(!doc) it.reply("Aucun Document trouver dans la whitelist avec ce Steam ID")
                    else{
                        const discord_id = doc.discordID
                        const pathFile = "../CivilWar95/Profiles/ServerProfile/CJ_Pass/DataBase/"+steam_id+".json"
                        const content = "{\n"
                                        +"\t\"BirthPlace\": \"" + place + "\",\n"
                                        +"\t\"BirthDay\": " + parseInt(day) + ",\n"
                                        +"\t\"BirthMonth\": " + parseInt(month) + ",\n"
                                        +"\t\"BirthYear\": " + parseInt(year) + "\n"
                                        +"}"

                        fs.writeFile(pathFile, content, {flag: 'w+'}, err=>{if(err)console.log(err)})
                        it.reply("Le passeport a été correctement modifié: \n Discord ID: "+ discord_id + "\n Steam ID: "+steam_id)
                    }
                }).catch((err)=>{if(err)console.log(err)})
            }
        })
        if(!flag) it.reply("Vous n'êtes pas autorisé a faire cette action")
    }
}