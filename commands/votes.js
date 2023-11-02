const Discord = require('discord.js');


module.exports = {
  name: 'votes',
  value: "N/A",
  description: "Get the ladderboard",
  options: [
    { name: 'max', description: "nombre max dans le ladderboard", type: 4, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}