const Discord = require('discord.js');


module.exports = {
  name: 'votes',
  value: "N/A",
  description: "Get the leaderboard",
  options: [
    { name: 'max', description: "nombre max dans le leaderboard", type: 4, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}