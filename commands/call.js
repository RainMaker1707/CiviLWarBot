const Discord = require('discord.js');


module.exports = {
  name: 'call',
  value: "N/A",
  description: "Initialise un appel vers un autre joueur",
  options: [
    { name: 'prenom', description: "Prenom RP du joueur", type: 3, required: true },
    { name: 'nom', description: "Nom RP du joueur", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}