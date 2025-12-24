import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
import { SERVERS, COLORS } from '../config.js';
import { fetchPlayerCount } from '../services/battlemetrics.js';
import { createServerListEmbed, createConnectEmbed } from '../utils/embeds.js';

export const serversCommand = new SlashCommandBuilder()
  .setName('servers')
  .setDescription('List all active Rustborne servers with live player counts');

export const handleServersCommand = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  try {
    // Fetch player counts for all servers
    const serverData = await Promise.all(
      SERVERS.map(async (server) => {
        const players = await fetchPlayerCount(server.id);
        return { ...server, ...players };
      })
    );

    const embeds = createServerListEmbed(serverData);

    if (embeds.length === 0) {
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.error)
            .setTitle('Error')
            .setDescription('Could not fetch server information.'),
        ],
      });
      return;
    }

    await interaction.editReply({ embeds });
  } catch (error) {
    console.error('Error in /servers command:', error);
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(COLORS.error)
          .setTitle('Error')
          .setDescription('Failed to fetch servers. Try again later.'),
      ],
    });
  }
};
