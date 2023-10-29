const Discord = require('discord.js');


module.exports = {
  name: 'accept',
  value: "N/A",
  description: "Accepte l'affiche",
  options: [
    { name: 'link', description: "lien de l'image (click droit copié lien)", type: 3, required: true },
    { name: 'author_id', description: "Discord ID de l'auteur", type: 3, required: true },
    { name: 'text', description: "Message de contexte optionnel", type: 3}
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}