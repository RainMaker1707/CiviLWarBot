const DS = require('discord.js')

const admin = "1113951433365127318"
const modo = "1113453048925265970"
const support = "1113950111253413929"

module.exports = {
    closeCmd: async (bot, it) => {
        const needContains = ["📄", "𝐓𝐢𝐜𝐤𝐞𝐭"]
        const channelToDelete = await bot.channels.cache.find(channel => channel.id === it.channelId)

        const authorized = [admin, modo, support]
        let flag = false
        let canDelete = true
        authorized.forEach((r)=>{
            console.log(r)
            console.log(it.member._roles.includes(r))
            if(it.member._roles.includes(r)){
                flag = true
                console.log("HERE 1")
                needContains.forEach((s)=> {
                    if (!channelToDelete.name.includes(s)) {
                        flag = false;
                        canDelete = false;
                        it.reply("Vous ne pouvez pas détruire ce channel, allez a cherno pour détruire des choses")
                        return;
                    }
                })
            }
        })
        if(!flag && !canDelete) it.reply("Vous n'avez pas les droit suffisant pour faire cela")
        else channelToDelete.delete()
    }
}