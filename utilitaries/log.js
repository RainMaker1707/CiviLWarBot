// 1155091637412823090 id log bot channel
const { botLogs } = require("../configs/config.json")


module.exports = {
    log: (bot, msg)=>{
        bot.channels.fetch(botLogs).then((chan)=>chan.send(msg))
        console.log(msg)
    }
}