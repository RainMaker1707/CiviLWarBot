const Discord = require('discord.js');


module.exports = {
  name: 'removebase',
  value: "N/A",
  description: "Enleve l'emplacement d'une base pour un joueur",
  options: [
    { name: 'id', description: "Discord ID", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}