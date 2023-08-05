const { DBName, WLtable, WarnTable,  BaseTable, BGTable} = require("../configs/config")
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
                            DB.db(DBName).collection(WarnTable).findOne({"id": id})
                            .then(async (WarnDoc)=>{
                                if(!WarnDoc){ 
                                    if(!BaseDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                    + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                    + "🏠 Base:\n- Aucune base\n"
                                                    + "🔴 Warnings:\n- Aucun warning enregistré")
                                    else it.reply("Infos du joueur <@" + id +">:\n"
                                                    + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                    + "🏠 Base:\n- Position: " + infos.BaseInfos.X + ", " + infos.BaseInfos.Y + "\n- Date: " + infos.BaseInfos.date + "\n- Staff: " + infos.BaseInfos.staff + "\n"
                                                    + "🔴 Warnings:\n- Aucun warning enregistré")
                                } else {
                                    const warns = await DB.db(DBName).collection(WarnTable).find({"id": id}).project({"_id": 0, "id": 0}).toArray()
                                    infos.WarnInfos.number = warns.length
                                    infos.WarnInfos.list = warns
                                    if(!BaseDoc) it.reply("Infos du joueur <@" + id +">:\n"
                                                    + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                    + "🏠 Base:\n- Aucune base\n"
                                                    + "🔴 Warnings:\n- Nombre: " + infos.WarnInfos.number + "\n- Liste: " + infos.WarnInfos.list)
                                    else it.reply("Infos du joueur <@" + id +">:\n"
                                                    + "🛂 WL:\n- DiscordID: "+ infos.WLinfos.discord_id +"\n- SteamID: " + infos.WLinfos.steam_id + "\n- Date: " + infos.WLinfos.date + "\n- Staff: " + infos.WLinfos.staff + "\n"
                                                    + "🏠 Base:\n- Position: " + infos.BaseInfos.X + ", " + infos.BaseInfos.Y + "\n- Date: " + infos.BaseInfos.date + "\n- Staff: " + infos.BaseInfos.staff + "\n"
                                                    + "🔴 Warnings:\n- Nombre: " + infos.WarnInfos.number + "\n- Liste: " + JSON.stringify(infos.WarnInfos.list))
                                }
                            })
                            .catch((err)=>{
                                console.log(err)
                                it.reply("Une erreur est survenue à la lecture des warnings.")
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