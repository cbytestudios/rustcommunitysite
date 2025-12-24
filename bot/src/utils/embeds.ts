import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config';
import type { ServerConfig } from '../config';
import { calculateWipeCountdown, getPlayerPercentage } from '../services/battlemetrics';

export const createServerListEmbed = (
  servers: (ServerConfig & { current: number; max: number })[]
) => {
  const embeds: EmbedBuilder[] = [];

  // Create embeds (25 fields max per embed)
  for (let i = 0; i < servers.length; i += 4) {
    const embed = new EmbedBuilder()
      .setColor(COLORS.primary)
      .setTitle('🌋 ACTIVE REALMS')
      .setDescription('Check out our servers. Use `/connect <name>` to join!')
      .setTimestamp();

    servers.slice(i, i + 4).forEach((server) => {
      const wipeCountdown = calculateWipeCountdown(server.nextWipe);
      const percentage = getPlayerPercentage(server.current, server.max);
      const statusEmoji = server.current > server.max * 0.75 ? '🔴' : server.current > 0 ? '🟢' : '⚫';

      embed.addFields({
        name: `${statusEmoji} ${server.name} (${server.region})`,
        value: `**Mode:** ${server.mode} | **Multiplier:** ${server.multiplier}\n**Players:** ${server.current}/${server.max} (${percentage}%)\n**Map:** ${server.map}\n**Wipe:** ${wipeCountdown} days | **Features:** ${server.features.join(', ')}`,
        inline: false,
      });
    });

    embeds.push(embed);
  }

  return embeds;
};

export const createWipeAlertEmbed = (server: ServerConfig, daysLeft: number) => {
  const emoji = daysLeft <= 1 ? '🚨' : daysLeft <= 3 ? '⚠️' : '🌋';

  return new EmbedBuilder()
    .setColor(daysLeft <= 1 ? COLORS.error : daysLeft <= 3 ? COLORS.warning : COLORS.primary)
    .setTitle(`${emoji} WIPE ALERT - ${server.name}`)
    .setDescription(
      `**${daysLeft} DAY${daysLeft !== 1 ? 'S' : ''} UNTIL WIPE**\n\nServer: \`${server.ip}:${server.port}\`\nMap: ${server.map}\nMultiplier: ${server.multiplier}x`
    )
    .setTimestamp()
    .setFooter({ text: 'Connect now to prepare!' });
};

export const createPlayerUpdateEmbed = (
  serverName: string,
  action: 'join' | 'leave',
  current: number,
  max: number,
  playerName?: string
) => {
  const isJoin = action === 'join';
  const emoji = isJoin ? '✅' : '❌';
  const title = isJoin ? 'Player Joined' : 'Player Left';
  const percentage = getPlayerPercentage(current, max);

  return new EmbedBuilder()
    .setColor(isJoin ? COLORS.success : COLORS.warning)
    .setTitle(`${emoji} ${title} - ${serverName}`)
    .setDescription(
      `${playerName ? `**${playerName}**` : 'A player'} ${isJoin ? 'joined' : 'left'} the server.\n\nPlayers: ${current}/${max} (${percentage}%)`
    )
    .setTimestamp();
};

export const createConnectEmbed = (serverName: string, ip: string, port: number) => {
  const steamConnect = `steam://connect/${ip}:${port}`;

  return new EmbedBuilder()
    .setColor(COLORS.primary)
    .setTitle(`🎮 Connect to ${serverName}`)
    .setDescription(
      `**Server IP:** \`${ip}:${port}\`\n**Steam Connect:** \`${steamConnect}\`\n\nCopy and paste into your console or click the Steam link!`
    )
    .setTimestamp();
};

export const createStatusCheckEmbed = (
  servers: (ServerConfig & { current: number; max: number })[]
) => {
  const embed = new EmbedBuilder()
    .setColor(COLORS.primary)
    .setTitle('🌋 SERVER STATUS CHECK')
    .setDescription('Real-time status of all Rustborne servers')
    .setTimestamp();

  let onlineCount = 0;
  let totalPlayers = 0;

  servers.forEach((server) => {
    if (server.current > 0) onlineCount++;
    totalPlayers += server.current;

    const percentage = getPlayerPercentage(server.current, server.max);
    const statusEmoji =
      server.current === 0 ? '⚫' : server.current > server.max * 0.75 ? '🔴' : '🟢';

    embed.addFields({
      name: `${statusEmoji} ${server.name}`,
      value: `${server.current}/${server.max} players (${percentage}%)`,
      inline: true,
    });
  });

  embed.setFooter({
    text: `${onlineCount}/${servers.length} servers active | ${totalPlayers} total players online`,
  });

  return embed;
};
