import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
import { SERVERS, COLORS } from '../config.js';
import { fetchPlayerCount } from '../services/battlemetrics.js';
import { createStatusCheckEmbed } from '../utils/embeds.js';

export const statusCommand = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Get real-time status of all servers');

export const handleStatusCommand = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  try {
    const serverData = await Promise.all(
      SERVERS.map(async (server) => {
        const players = await fetchPlayerCount(server.id);
        return { ...server, ...players };
      })
    );

    const embed = createStatusCheckEmbed(serverData);
    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('Error in /status command:', error);
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(COLORS.error)
          .setTitle('Error')
          .setDescription('Failed to fetch status. Try again later.'),
      ],
    });
  }
};
