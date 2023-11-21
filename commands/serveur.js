const Discord = require('discord.js');


module.exports = {
  name: 'serveur',
  value: "N/A",
  description: "Status serveur",
  options: [
    { name: 'status', description: "On / Off / Restart / Maj", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}