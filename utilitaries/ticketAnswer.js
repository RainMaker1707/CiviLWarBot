const DS = require('discord.js');
let { counter } = require('../configs/config.json')
const { log } = require("./log")

module.exports = {
    answer: async (it, name, message, bot, id) => {
        const channelColl = await bot.channels.cache.find(channel => channel.id === id)
        const everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
        const whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
        const nonwhitelist = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
        const modo = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
        const support = await it.guild.roles.cache.find(r => r.id === '1113950111253413929')
        // write new counter in config.json with fs
        const channelName = name + ++counter
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
        channel.send("Bonjour "+`${it.user.toString()},\n\n` + message + "\n<@&1113453048925265970> "+ "<@&1113950111253413929>")

        log(bot, "Channel '"+ channelName +"' created")
        it.reply("Channel " + channel.toString() +" created").then(msg => {
            setTimeout(() => msg.delete(), 10000)
            });
    },
    answerDeath: async (it, name, message, bot, id) => {
        const channelColl = await bot.channels.cache.find(channel => channel.id === id)
        const everyoneRole = await it.guild.roles.cache.find(r => r.name === '@everyone')
        const whitelist = await it.guild.roles.cache.find(r => r.id === '1113952117435146370')
        const nonwhitelist = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
        const modo = await it.guild.roles.cache.find(r => r.id === '1113453048925265970')
        // write new counter in config.json with fs
        const channelName = name + ++counter
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
                }
            ]
        })
        channel.send("Bonjour "+`${it.user.toString()},\n\n` + message + "\n <@&1113951433365127318> <@&1113453048925265970> ")

        log(bot, "Channel '"+ channelName +"' created")
        it.reply("Channel " + channel.toString() +" created").then(msg => {
            setTimeout(() => msg.delete(), 10000)
            });
    }
}
