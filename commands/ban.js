const Discord = require('discord.js');


module.exports = {
  name: 'ban',
  value: "N/A",
  description: "Initialise un appel vers un autre joueur",
  options: [
    { name: 'discord-id', description: "Discord ID du joueur", type: 3, required: true },
    { name: 'raison', description: "Raison du ban", type: 3, required: true },
    { name: 'time', description: "Temps du ban, 1 jour, 1 semaine ou definitif", type: 3, required: true}
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}