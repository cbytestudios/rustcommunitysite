import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { SERVERS, COLORS } from '../config';
import { calculateWipeCountdown } from '../services/battlemetrics';

export const wipeCommand = new SlashCommandBuilder()
  .setName('wipe')
  .setDescription('Check wipe countdown for a server')
  .addStringOption((option) =>
    option
      .setName('server')
      .setDescription('Server name')
      .setRequired(true)
      .addChoices(
        ...SERVERS.map((s) => ({ name: s.name, value: s.id }))
      )
  );

export const handleWipeCommand = async (interaction: ChatInputCommandInteraction) => {
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

  const daysLeft = calculateWipeCountdown(server.nextWipe);
  const wipeDate = new Date(server.nextWipe);
  const emoji = daysLeft <= 1 ? '🚨' : daysLeft <= 3 ? '⚠️' : '🌋';

  const embed = new EmbedBuilder()
    .setColor(daysLeft <= 1 ? COLORS.error : daysLeft <= 3 ? COLORS.warning : COLORS.primary)
    .setTitle(`${emoji} ${server.name} - Wipe Countdown`)
    .setDescription(`**${daysLeft} day${daysLeft !== 1 ? 's' : ''} until wipe**`)
    .addFields(
      { name: 'Wipe Date', value: wipeDate.toLocaleDateString(), inline: true },
      { name: 'Map', value: server.map, inline: true },
      { name: 'Multiplier', value: server.multiplier, inline: true }
    )
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
};
