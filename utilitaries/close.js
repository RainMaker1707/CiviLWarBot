const DS = require('discord.js')
const { authorized } = require('./privilegied')
const { log } = require("./log")

module.exports = {
    closeCmd: async (bot, it) => {
        const needContains = ["📄", "°"]
        const channelToDelete = await bot.channels.cache.find(channel => channel.id === it.channelId)

        let flag = false
        let canDelete = true
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag = true
                needContains.forEach((s)=> {
                    if (!channelToDelete.name.includes(s) && canDelete) {
                        canDelete = false;
                        it.reply("Vous ne pouvez pas détruire ce channel, allez a cherno pour détruire des choses")
                        return;
                    }
                })
            }
        })
        if(!flag) {
            it.reply("Vous n'avez pas les droit suffisant pour faire cela")
            console.log("ok")
        }else if(flag && canDelete){
            console.log("ok")
            log(bot, "Deleted channel:  " + channelToDelete.name + " by user: " + it.user.username)
            try{
                channelToDelete.delete()
            }catch(Error) {
                log(bot, "Error while deleting channel")
            }
        }
    }
}