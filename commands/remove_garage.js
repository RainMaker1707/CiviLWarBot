const Discord = require('discord.js');


module.exports = {
  name: 'remove_garage',
  value: "N/A",
  description: "Enleve un garage pour un joueur",
  options: [
    { name: 'discord_id', description: "Discord ID du joueur", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}