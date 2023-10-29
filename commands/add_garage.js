const Discord = require('discord.js');


module.exports = {
  name: 'add_garage',
  value: "N/A",
  description: "Ajoute un garage pour un joueur",
  options: [
    { name: 'discord_id', description: "Discord ID du joueur", type: 3, required: true },
    { name: 'x_pos', description: "Position X sur la carte", type: 3, required: true },
    { name: 'y_pos', description: "Position Y sur la carte", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}