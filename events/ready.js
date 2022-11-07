/** This is for the ready event 
 * in the past it was handled within index.js
 * 
 * client.once('ready',(client) => {code});
*/

module.exports = {
  name: 'ready',
  once: true,
  async execute(client){
    console.log('Reportbot Ready!');
  }
}