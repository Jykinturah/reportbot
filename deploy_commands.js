'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { discordBotClientID, discordBotClientToken, discordGuildID } = require('./config.json');

/** '/' Commands */
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(discordBotClientToken);

/** Due to how reportbot works, we are not registering the commands globally. Therefore the discordGuildID is required. */
rest.put(Routes.applicationCommands(discordBotClientID, discordGuildID), { body: commands })
    .then(data => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);