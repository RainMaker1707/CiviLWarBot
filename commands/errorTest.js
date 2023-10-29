const Discord = require('discord.js');


module.exports = {
  name: 'error',
  value: "N/A",
  description: "TEST the error logger",
  options: [],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}