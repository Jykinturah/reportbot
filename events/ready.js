/** This is for the ready event 
 * in the past it was handled within index.js
 * 
 * client.once('ready',(client) => {code});
*/

const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client){
    console.log(`Reportbot running as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: `reports`, type: ActivityType.Listening}]
    });
    console.log("https://discordapp.com/oauth2/authorize?client_id="+client.user.id+"&scope=bot");
  }
}