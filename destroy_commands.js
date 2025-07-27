'use strict';

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { discordBotClientID, discordGuildID, discordBotClientToken } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(discordBotClientToken);

rest.put(Routes.applicationGuildCommands(discordBotClientID, discordGuildID), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

rest.put(Routes.applicationCommands(discordBotClientID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);