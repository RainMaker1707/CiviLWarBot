const Discord = require('discord.js');


module.exports = {
  name: 'bg',
  value: "N/A",
  description: "Ajoute un background a un joueur",
  options: [
    { name: 'id', description: "Discord ID", type: 3, required: true },
    { name: 'prenom', description: "Prénom RP du joueur", type: 3, required: true },
    { name: 'nom', description: "Nom RP du joueur", type: 3, required: true },
    { name: 'background', description: "Background du joueur", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}