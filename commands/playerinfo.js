const Discord = require('discord.js');


module.exports = {
  name: 'playerinfo',
  value: "N/A",
  description: "Donne les infos d'un joueur",
  options: [
    { name: 'discord_id', description: "Discord ID", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("Get BG slashed")
  }
}