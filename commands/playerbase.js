const Discord = require('discord.js');


module.exports = {
  name: 'playerbase',
  value: "N/A",
  description: "Ajoute l'emplacement d'une base pour un joueur",
  options: [
    { name: 'id', description: "Discord ID", type: 3, required: true },
    { name: 'pos_x', description: "Position X de la base", type: 3, required: true },
    { name: 'pos_y', description: "Position Y de la base", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}