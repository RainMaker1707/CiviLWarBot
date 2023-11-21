const { getOpt } = require("./getOpt")
const { autho } = require("./privilegied")
const { serverStatus, botLogs } = require("../configs/config.json")
const { whitelisted } =require("./privilegied")

picture = {
    "on": "https://media.discordapp.net/attachments/1114570153028493313/1169734710231052398/CW95-En-Ligne.png?ex=65567b57&is=65440657&hm=92d11e683d3eafd2280ced9c30b75bf065c4265ad8259f2456c54dbe70bcbe7c&=",
    "off": "https://media.discordapp.net/attachments/1114570153028493313/1169734709966803044/CW95-Hors-Ligne.png?ex=65567b57&is=65440657&hm=6a32d4a7667261f79e100c807bfe7f1a14e2214badb654322c93b8a09dbfdc8b&=",
    "restart": "https://media.discordapp.net/attachments/1114570153028493313/1169734710608535632/CW95-Restart.png?ex=65567b57&is=65440657&hm=22db1880c2534274540930bfd4d13eab76a18f3386a578652e4ae0e713c540f2&=",
    "maj": "https://media.discordapp.net/attachments/1114570153028493313/1169734711178956800/CW95-Mise_a_jour.png?ex=65567b57&is=65440657&hm=5076c8cc910d2e6b094be13c95e1afefc4082ac404ece9df12a28fadd0481eec&="
}


module.exports = {
    status: (bot, it)=>{
        if(!autho(it)) it.reply("Vous n'etes pas autorisé à utiliser cette commande!")
        else{
            stat = getOpt(it, "status").toLowerCase()
            ok_stat = ["on", "off", "restart", "maj"]
            if(!ok_stat.includes(stat)) it.reply("Le status fournis n'est pas correct, les seuls accepter sont ON, OFF, RESTART et MAJ.")
            else{
                bot.channels.fetch(serverStatus).then((chan)=>{
                    chan.send("<@&" + whitelisted +">")
                    chan.send({files: [picture[stat]]})
                    it.reply("Message correctement envoyé")
                })
            }
        }
    }
}