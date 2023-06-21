const Discord = require('discord.js');


module.exports = {
  name: 'freq',
  value: "N/A",
  description: "Rejoins un channel radio",
  options: [
    { name: 'frequence', description: "Frequence radio a joindre [80.0, 180.0] par .5", type: 3, required: true }
  ],
  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}