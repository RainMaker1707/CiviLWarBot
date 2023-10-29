const { DBName, WLtable, WarnTable,  BaseTable, BGTable, GarageTable} = require("../configs/config")
const { getOpt } = require("./getOpt")
const { authorized } = require("./privilegied")


module.exports = {
    playerinfo: (it, DB)=>{

        const id = getOpt(it, "discord_id")
        let flag = false

        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                let infos = {
                    WLinfos: {
                        steam_id: "",
                        discord_id: "",
                        date: "",
                        staff: ""
                    },
                    WarnInfos:{
                        number: 0,
                        list: []
                    },
                    BaseInfos: {
                        X: 0,
                        Y: 0,
                        date: "",
                        staff: ""
                    },
                    GarageInfos: {
                        X: 0,
                        Y: 0,
                        date: "",
                        staff: ""
                    }
                }
                DB.db(DBName).collection(WLtable).findOne({"discordID": id})
                .then((WLdoc)=>{
                    if(!WLdoc) it.reply("Aucune document trouvé dans la WL avec cet ID Discord.")
                    else{
                        infos.WLinfos.steam_id = WLdoc.steamID
                        infos.WLinfos.discord_id = WLdoc.discordID
                        if(WLdoc.date) infos.WLinfos.date = WLdoc.date
                        else  infos.WLinfos.date = "Beta"
                        if(WLdoc.staff) infos.WLinfos.staff = WLdoc.staff
                        else  infos.WLinfos.staff = "Beta"

                        DB.db(DBName).collection(BaseTable).findOne({"id": id})
                        .then((BaseDoc)=>{
                            if(!BaseDoc) infos.BaseInfos = "Aucune base"
                            else {
                                infos.BaseInfos.X = BaseDoc.X
                                infos.BaseInfos.Y = BaseDoc.Y
                                infos.BaseInfos.date = BaseDoc.date
                                infos.BaseInfos.staff = BaseDoc.staff
                            }
                            DB.db(DBName).collection(GarageTable).findOne({"id": id})
                            .then((GarageDoc)=>{
                                if(!GarageDoc) infos.GarageInfos = "Aucun garage"
                                else {
                                    infos.GarageInfos.X = GarageDoc.X
                                    infos.GarageInfos.Y = GarageDoc.Y
                                    infos.GarageInfos.date = GarageDoc.date
                                    infos.GarageInfos.staff = GarageDoc.staff
                                }  
                            
                            
                                DB.db(DBName).collection(WarnTable).findOne({"id": id})
                                .then(async (WarnDoc)=>{
                                    if(!WarnDoc){ 
                                        if(!BaseDoc && !GarageDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                            + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                            + "🏠 Base:\n- Aucune base\n"
                                                            + "🚗 Garage:\n- Aucun garage\n"
                                                            + "🔴 Warnings:\n- Aucun warning enregistré")
                                        else if(!BaseDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                            + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                            + "🏠 Base:\n- Aucune base\n"
                                                            + "🚗 Garage:\n- Position: " + infos.GarageInfos.X + ", " + infos.GarageInfos.Y + "\n- Date: " + infos.GarageInfos.date + "\n- Staff: " + infos.GarageInfos.staff + "\n"
                                                            + "🔴 Warnings:\n- Aucun warning enregistré")
                                        else if(!GarageDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                            + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                            + "🏠 Base:\n- Position: " + infos.BaseInfos.X + ", " + infos.BaseInfos.Y + "\n- Date: " + infos.BaseInfos.date + "\n- Staff: " + infos.BaseInfos.staff + "\n"
                                                            + "🚗 Garage:\n- Aucun garage\n"
                                                            + "🔴 Warnings:\n- Aucun warning enregistré")
                                        else it.reply("Infos du joueur <@" + id +">:\n"
                                                            + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                            + "🏠 Base:\n- Position: " + infos.BaseInfos.X + ", " + infos.BaseInfos.Y + "\n- Date: " + infos.BaseInfos.date + "\n- Staff: " + infos.BaseInfos.staff + "\n"
                                                            + "🚗 Garage:\n- Position: " + infos.GarageInfos.X + ", " + infos.GarageInfos.Y + "\n- Date: " + infos.GarageInfos.date + "\n- Staff: " + infos.GarageInfos.staff + "\n"
                                                            + "🔴 Warnings:\n- Aucun warning enregistré")
                                    } else {
                                        const warns = await DB.db(DBName).collection(WarnTable).find({"id": id}).project({"_id": 0, "id": 0}).toArray()
                                        infos.WarnInfos.number = warns.length
                                        infos.WarnInfos.list = warns
                                        let warnings_str = "\n "
                                        for(let i = 0; i < warns.length; i++){
                                            warnings_str += "- " + warns[i].date + ": " + warns[i].staff + "\n   - "
                                            warnings_str += warns[i].reason
                                            warnings_str += "\n "
                                        }
                                        if(!BaseDoc && !GarageDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                        + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                        + "🏠 Base:\n- Aucune base\n"
                                                        + "🚗 Garage:\n- Aucun garage\n"
                                                        + "🔴 Warnings:\n- Nombre: " + infos.WarnInfos.number + "\n- Liste: " + warnings_str)
                                        else if(!BaseDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                        + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                        + "🏠 Base:\n- Aucune base\n"
                                                        + "🚗 Garage:\n- Position: " + infos.GarageInfos.X + ", " + infos.GarageInfos.Y + "\n- Date: " + infos.GarageInfos.date + "\n- Staff: " + infos.GarageInfos.staff + "\n"
                                                        + "🔴 Warnings:\n- Nombre: " + infos.WarnInfos.number + "\n- Liste: " + warnings_str)
                                        else if(!GarageDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                        + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                        + "🏠 Base:\n- Position: " + infos.BaseInfos.X + ", " + infos.BaseInfos.Y + "\n- Date: " + infos.BaseInfos.date + "\n- Staff: " + infos.BaseInfos.staff + "\n"
                                                        + "🚗 Garage:\n- Aucun garage\n"
                                                        + "🔴 Warnings:\n- Nombre: " + infos.WarnInfos.number + "\n- Liste: " + warnings_str)
                                        else it.reply("Infos du joueur <@" + id +">:\n"
                                                        + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                        + "🏠 Base:\n- Position: " + infos.BaseInfos.X + ", " + infos.BaseInfos.Y + "\n- Date: " + infos.BaseInfos.date + "\n- Staff: " + infos.BaseInfos.staff + "\n"
                                                        + "🚗 Garage:\n- Position: " + infos.GarageInfos.X + ", " + infos.GarageInfos.Y + "\n- Date: " + infos.GarageInfos.date + "\n- Staff: " + infos.GarageInfos.staff + "\n"
                                                        + "🔴 Warnings:\n- Nombre: " + infos.WarnInfos.number + "\n- Liste: " + warnings_str)
                                    }
                                })
                                .catch((err)=>{
                                    console.log(err)
                                    it.reply("Une erreur est survenue à la lecture des warnings.")
                                })
                            
                            
                            })
                            .catch((err)=>{
                                console.log(err)
                                it.reply("Une erreur est survenue pendant la lecture des garages.")
                            })
                        })
                        .catch((err)=>{
                            console.log(err)
                            it.reply("Une erreur est survenue pendant la lecture des bases.")
                        })
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    it.reply("Une erreur est survenur pendant la lecture de la WL.")
                })
            }
        })
        if (!flag) it.reply("Vous n'avez pas l'autorisation de faire celà")

    }
}




/*

*/