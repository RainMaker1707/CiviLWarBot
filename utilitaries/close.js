const DS = require('discord.js')
const { authorized } = require('./privilegied')

module.exports = {
    closeCmd: async (bot, it) => {
        const needContains = ["📄", "°"]
        const channelToDelete = await bot.channels.cache.find(channel => channel.id === it.channelId)

        let flag = false
        let canDelete = true
        authorized.forEach((r)=>{
            if(it.member._roles.includes(r)){
                flag = true
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
        else {
            console.log("Deleted channel:  " + channelToDelete.name + " by user: " + it.user.username)
            channelToDelete.delete()
        }
    }
}