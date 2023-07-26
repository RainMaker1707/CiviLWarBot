const Discord = require('discord.js');


module.exports = {
  name: 'pass_steam',
  value: "N/A",
  description: "Customise les données d'un passeport ingame",
  options: [
    { name: 'id', description: "Steam ID", type: 3, required: true },
    { name: 'birthday', description: "Format DD", type: 3, required: true },
    { name: 'birthmonth', description: "Format MM", type: 3, required: true },
    { name: 'birthyear', description: "Format YYYY", type: 3, required: true },
    { name: 'birthplace', description: "Pays de naissance (ex: Chernarus, Ukraine, Russia, ...)", type: 3, required: true }
  ],

  execute(interaction, client, callback) {
      console.log("CheckID slashed")
  }
}