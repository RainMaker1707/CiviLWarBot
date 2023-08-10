const DS = require("discord.js")
const { whitelisted } = require("./privilegied")

const regex = /[+-]?\d+(\.\d+)?/g;
const faction_freq = ["36.425", "37.650", "73.475"] //armée, chedaki, police

function sanitized(input){
    if(faction_freq.includes(input)) return true
    const matched = input.match(regex)
    if(matched == null) return false
    const floats = matched.map(v=>parseFloat(v))[0]
    const decimal = parseFloat(input.split(".")[1])
    if(!(decimal == 0) && !(decimal == 5)) {
        return false
    }
    if(!(floats >= 80.0) && !(floats <= 180.0)) {
        console.log("FLOAT")
        return false
    }
    return true
}


module.exports = {
    radioCmd: async (bot, it) => {
        //test if user is in audio channel if not refuse the query
        if (!it.member.voice.channel) {
            it.reply("Tu dois être connecté dans un chan vocal pour faire cela.");
            return;
        }
        // test if user is whitelisted
        if(!it.member._roles.includes(whitelisted)) it.reply("Tu dois d'abord être whitelist pour aller sur une frequence radio")
        else{
            if(!sanitized(it.options._hoistedOptions[0].value)){
                it.reply("Une fréquence entre 80.0 et 180.0 par tranche de .5 ex: 112.5 est accepté 112.11 ne l'est pas")
                return;
            }
            const channelName = " 🔊┃"+ it.options._hoistedOptions[0].value.match(regex)[0]
            let channel

            const everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
            const whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
            const modo = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
            const support = await it.guild.roles.cache.find(r => r.id === '1113950111253413929')

            const chan = await bot.channels.cache.find((chan) => chan.name.split('┃')[1] === channelName.split('┃')[1])
            const chanRP = await bot.channels.cache.find((chan) => chan.id === "1113948885631639563")
            if(chan == null) {
                // create channel if it doesn't exists
                channel = await it.member.guild.channels.create({
                    name: channelName,
                    type: DS.ChannelType.GuildVoice,
                    parent: chanRP.parent,
                    permissionOverwrites: [
                        {
                            id: everyoneRole,
                            deny: [DS.PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: whitelist,
                            deny: [DS.PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: it.user.id,
                            allow: [DS.PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: modo,
                            allow: [DS.PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: support,
                            allow: [DS.PermissionsBitField.Flags.ViewChannel]
                        }
                    ]
                })
            } else channel = chan
            //move member
            it.member.voice.setChannel(channel)
            it.reply("test reply").then(msg => {
                setTimeout(() => msg.delete(), 1)
                })
        }
    }
}