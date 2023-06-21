const DS = require('discord.js');
const { ComponentType } = require('discord.js');

let wlcounter = 2

module.exports = {
    ticketWL: async (bot)=>{
        const channelColl = await bot.channels.cache.find(channel => channel.id === "1113446931591602206")
        const collector = channelColl.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });

        collector.on("collect", async (it)=>{
            console.log(it.user)
            const everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
            const whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
            const nonwhitelist = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
            const modo = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
            const support = await it.guild.roles.cache.find(r => r.id === '1113950111253413929')
            const channelName = "📄🛃┃𝐖𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭 𝐍°" + ++wlcounter
            const channel = await it.member.guild.channels.create({
                name: channelName,
                type: DS.ChannelType.GuildText,
                parent: channelColl.parent,
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
                        id: nonwhitelist,
                        deny: [DS.PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: it.user.id,
                        allow: [DS.PermissionsBitField.Flags.ViewChannel, DS.PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: modo,
                        allow: [DS.PermissionsBitField.Flags.ViewChannel, DS.PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: support,
                        allow: [DS.PermissionsBitField.Flags.ViewChannel, DS.PermissionsBitField.Flags.SendMessages]
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