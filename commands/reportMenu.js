const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('report')
        .setType(ApplicationCommandType.Message)
        .setDMPermission(false),
    async execute(interaction) {
        const reportEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('User Report')
            .addFields({ name: 'Message', value: (interaction.targetMessage.content.length > 0 ? interaction.targetMessage.content : 'Embedded Content') }, { name: 'Author', value: interaction.targetMessage.author.tag, inline: true }, { name: 'Channel/Thread', value: `#${interaction.targetMessage.channel.name}`, inline: true }, { name: 'Reported By', value: interaction.user.tag, inline: true }, { name: 'Link', value: `[Go to Message](${interaction.targetMessage.url}) ➡`, inline: true });
        const ackRow = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setCustomId('ack').setLabel('Acknowledge').setStyle(ButtonStyle.Primary))
        await interaction.client.channels.cache.get(config.reportChannelID).send({ content: '@here', embeds: [reportEmbed], components: [ackRow] })
        await interaction.reply({ content: 'Report recieved, moderaters will review it shortly!', ephemeral: true });
    },
};