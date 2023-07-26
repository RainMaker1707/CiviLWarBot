const Discord = require('discord.js');


module.exports = {
  name: 'steam_id',
  value: "N/A",
  description: "get Steam id from DS id",
  options: [
    { name: 'discord_id', description: "Discord ID dans la WL", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}