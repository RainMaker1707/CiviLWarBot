const config = require("../configs/config.json")

const message = "Bonjour !\n\n"
                + "Si tu reçois ce message, c'est que tu es sur le Discord du nouveau serveur RP Dayz \"Civil War 95\", "
                + "et nous voulions t'annoncer que le serveur ouvre ses portes aujourd'hui à 18h. Pour passer la whitelist"
                + " et accéder au serveur dès l'ouverture, clique ici : https://discordapp.com/channels/1113445147707981834/1113446931591602206/1137678973602635776\n\n"
                +"Inutile de mute/bloquer le bot qui t'envoie ce message, il n'y aura pas d'autre intrusion dans tes MP, c'est promis 🙂\n\n"
                +"Bonne journée à toi et à bientôt peut-être !\n"
                +"**Le Staff CW95**"


module.exports = {
    release: (bot, it)=>{
        if(config.release == 0){
            let count = 0
            bot.guilds.fetch(config.guildId).then((GUI)=>{
                GUI.members.cache.forEach(m=>{
                    try{
                        if(m.user.username != 'CivilWar1995'){
                            m.user.send(message)
                            .then(()=>console.log(m.user.username + " v"))
                            .catch(e=>console.log(m.user.username +" x"))
                        }
                        count++
                    }catch(error){
                        console.log(error)
                        console.log(m.user.username)
                    }
                })
            })
            config.release++
            it.reply("Le message a été envoyé")
        }else it.reply("Le message a déjà été envoyé")
        
    }
}