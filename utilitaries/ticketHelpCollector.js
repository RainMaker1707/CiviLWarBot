const DS = require('discord.js');
const { ComponentType } = require('discord.js');

let counter = 0
const channelName = "📄📕┃𝐓𝐢𝐜𝐤𝐞𝐭-𝐀°" + ++counter

module.exports = {
    ticketWL: async (bot)=>{
        const channelColl = await bot.channels.cache.find(channel => channel.id === "1113937575950954557")
        const collector = channelColl.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });
        collector.on("collect", async (it)=>{
            const everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
            const whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
            const channel = await it.member.guild.channels.create({
                name: channelName,
                type: DS.ChannelType.GuildText,
                parent: channelColl.parent, 
                permissionsOverwrites:[
                    {
                        id: it.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ]
            })
            channel.updateOverwrite(it.user, {VIEW_CHANNEL:true, SEND_MESSAGES:true})
            channel.send(`${it.user.toString()}`)

            console.log("Channel '"+ channelName +"' created")
            it.reply("Channel " + channel.toString() +" created. \n Comment pouvons nnous vous aider?").then(msg => {
                setTimeout(() => msg.delete(), 10000)
                });
        })  
    }
}