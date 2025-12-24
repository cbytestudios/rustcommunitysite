import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
import { SERVERS, COLORS } from '../config';
import { createConnectEmbed } from '../utils/embeds';

export const connectCommand = new SlashCommandBuilder()
  .setName('connect')
  .setDescription('Get connect info for a server')
  .addStringOption((option) =>
    option
      .setName('server')
      .setDescription('Server name')
      .setRequired(true)
      .addChoices(
        ...SERVERS.map((s) => ({ name: s.name, value: s.id }))
      )
  );

export const handleConnectCommand = async (interaction: CommandInteraction) => {
  const serverId = interaction.options.getString('server', true);
  const server = SERVERS.find((s) => s.id === serverId);

  if (!server) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(COLORS.error)
          .setTitle('Server Not Found')
          .setDescription('Could not find that server.'),
      ],
      ephemeral: true,
    });
    return;
  }

  const embed = createConnectEmbed(server.name, server.ip, server.port);
  await interaction.reply({ embeds: [embed], ephemeral: true });
};
