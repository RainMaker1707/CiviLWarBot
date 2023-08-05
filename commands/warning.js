const Discord = require('discord.js');


module.exports = {
  name: 'warn',
  value: "N/A",
  description: "Donne un warning a un joueur",
  options: [
    { name: 'discord_id', description: "Discord ID", type: 3, required: true },
    { name: 'reason', description: "Raison de l'avertissement", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("Get BG slashed")
  }
}