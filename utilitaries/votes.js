const { log } = require("./log")
const { authorized, autho } = require("./privilegied")
const { getOpt } = require("./getOpt")


module.exports = {
    ladderboard: (bot, it) =>{
        if(!autho(it)) it.reply("Vous n'etes pas autorisé à faire cette commande")
        else{
            end = getOpt(it, "max")
            firstOne = ""
            count = 0
            txt = "# Ladderboard du mois précédent:\n"
            fetch("https://api.top-serveurs.net/v1/servers/RQR838GT8BFC/players-ranking?type=lastMonth")
                .then((res)=>{
                    res.json().then(data=>{
                        data.players.forEach(e => {
                            if(e.playername != '' && count < end){
                                if(count == 0) firstOne = e.playername
                                txt += "- **" + e.playername + "** avec *" + e.votes + "* votes !\n"
                                count++
                            }
                            if(count == end || count == data.players.length){
                                txt += "\n**Le gagnant est: " + firstOne + ", bravo à lui / elle!**"
                                it.reply(txt)
                                count++
                            }
                        })
                    }).catch((err)=>{
                        log(bot, err)
                        it.reply("Error in Data parsing")
                    })
                }).catch((err)=>{
                    log(bot, err)
                    it.reply("Error in HTTP request")
                })
        }
    },
    currentLadderboard: (bot, it) =>{
        if(!autho(it)) it.reply("Vous n'etes pas autorisé à faire cette commande")
        else{
            end = getOpt(it, "max")
            firstOne = ""
            count = 0
            txt = "# Ladderboard de ce mois:\n"
            fetch("https://api.top-serveurs.net/v1/servers/RQR838GT8BFC/players-ranking")
                .then((res)=>{
                    res.json().then(data=>{
                        data.players.forEach(e => {
                            if(e.playername != '' && count < end){
                                if(count == 0) firstOne = e.playername
                                txt += "- **" + e.playername + "** avec *" + e.votes + "* votes !\n"
                                count++
                            }
                            if(count == end || count == data.players.length){
                                txt += "\n**Le gagnant actuel est: " + firstOne + ", battez vous pour remonter!**"
                                it.reply(txt)
                                count++
                            }
                        })
                    }).catch((err)=>{
                        log(bot, err)
                        it.reply("Error in Data parsing")
                    })
                }).catch((err)=>{
                    log(bot, err)
                    it.reply("Error in HTTP request")
                })
        }
    }
}