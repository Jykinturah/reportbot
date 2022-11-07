# Reportbot

Discord bot that allows Discord users to report messages using a context menu command.

## Installation

- Create a discord bot here: https://discord.com/developers/applications
- Take a note of the discord bot token and the application's client ID
- `git clone https://github.com/Jykinturah/reportbot.git`
- `cd reportbot`
- `npm install`
- `cp config.json.sample config.json`
- Edit the `config.json` file with your credentials and other information.

## How it works

1. Users can right click or long press on a message in discord to bring up the context menu.
2. Within the context menu under apps, there is the `report` command.
3. The bot will send the message to the configured `reportChannelID` in `config.json` and notify everyone in that channel with `@here`.
4. The user will see an ephemeral message only they can see that confirms their report.

## Notes

With the new Intents that Discord requires, this bot needs access to GUILD, GUILD_MESSAGES, and most critically MESSAGE_CONTENT. The Message Content Intent must be enabled in the bot application configuration in the Discord Developers Portal. It can be found under your application > Bot > Privileged Gateway Intents.

## Planned features

- An additional report command that supports a Modal so that users can add their own notes to a report if desired.