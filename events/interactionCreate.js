const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const config = require('../config.json');

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        /** Ignore if not an Chat Input, Context Menu, or Button Interaction **/
        if (!interaction.isButton() && !interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;

        /** Button Interactions **/
        if (interaction.isButton()) {
            if (interaction.customId === 'ack') {
                const reportEmbedFields = interaction.message.embeds[0].fields;
                const reportEmbed = new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setTitle('User Report')
                    .addFields(reportEmbedFields);
                const ackRow = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder().setCustomId('ack').setLabel(`Acknowledged By ${interaction.user.tag}`).setStyle(ButtonStyle.Primary).setDisabled(true))
                await interaction.message.edit({ content: '', embeds: [reportEmbed], components: [ackRow] });
                await interaction.reply({ content: 'Acknowledged!' });
                await wait(3000);
                await interaction.deleteReply();
            }
        }

        /* Use the commands objects imported from the ../commands folder and run the functions within them */
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    },
};