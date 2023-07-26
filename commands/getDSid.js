const Discord = require('discord.js');


module.exports = {
  name: 'ds_id',
  value: "N/A",
  description: "get DS id from Steam id",
  options: [
    { name: 'steam_id', description: "Steam ID dans la WL", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}