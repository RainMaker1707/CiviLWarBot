const Discord = require('discord.js');


module.exports = {
  name: 'close',
  value: "N/A",
  description: "Ferme le channel",
  options: [
    { name: 'channel-id', description: "ID du channel a fermer, faites attention avec cette commande", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}