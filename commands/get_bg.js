const Discord = require('discord.js');


module.exports = {
  name: 'get_bg',
  value: "N/A",
  description: "Donne le background d'un joueur",
  options: [
    { name: 'discord_id', description: "Discord ID", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("Get BG slashed")
  }
}