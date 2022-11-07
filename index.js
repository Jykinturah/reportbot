'use strict';

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { discordBotClientToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Guild
   	Needed to access channel names and threads.
 * GuildMessages
   	Needed to create messages inside the server.
 * MessageContent
  	Needed to access message contents for reports.
    Note: This is a VERY BROAD permission as the bot can read all messages it sees.
*/

const client = new Client(
  { intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ] 
  }
);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
  else client.on(event.name, (...args) => event.execute(...args,client));
}

client.login(discordBotClientToken);