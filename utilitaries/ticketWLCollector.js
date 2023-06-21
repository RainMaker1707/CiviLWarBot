const DS = require('discord.js');
const { ComponentType } = require('discord.js');

let wlcounter = 0

module.exports = {
    ticketWL: async (bot)=>{
        const channelColl = await bot.channels.cache.find(channel => channel.id === "1113446931591602206")
        const collector = channelColl.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });

        collector.on("collect", async (it)=>{
            const everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
            const whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
            const nonwhite = await it.guild.roles.cache.find(r => r.id === '1113453224133939210')
            const channelName = "🛃┃𝐖𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭 𝐍°" + ++wlcounter
            const channel = await it.member.guild.channels.create({
                name: channelName,
                type: DS.ChannelType.GuildText,
                parent: channelColl.parent, 
                permissionsOverwrites:[
                    {
                        id: everyoneRole,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: whitelist,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: nonwhite,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: it.user,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ]
            })
            channel.send(`${it.user.toString()}`)

            console.log("Channel '"+ channelName +"' created")
            it.reply("Channel " + channel.toString() +" created").then(msg => {
                setTimeout(() => msg.delete(), 10000)
                });
        })  
    }
}