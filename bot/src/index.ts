import { Client, GatewayIntentBits, ChannelType, TextChannel } from 'discord.js';
import cron from 'node-cron';
import { SERVERS, BOT_CONFIG, COLORS } from './config.js';
import { calculateWipeCountdown, fetchPlayerCount } from './services/battlemetrics.js';
import { createWipeAlertEmbed, createStatusCheckEmbed } from './utils/embeds.js';
import { serversCommand, handleServersCommand } from './commands/servers.js';
import { connectCommand, handleConnectCommand } from './commands/connect.js';
import { wipeCommand, handleWipeCommand } from './commands/wipe.js';
import { statusCommand, handleStatusCommand } from './commands/status.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

let isReady = false;

client.once('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
  isReady = true;

  // Register slash commands
  try {
    const commands = [
      serversCommand,
      connectCommand,
      wipeCommand,
      statusCommand,
    ];

    await client.application?.commands.set(commands);
    console.log('✅ Slash commands registered');
  } catch (error) {
    console.error('Error registering commands:', error);
  }

  // Start scheduled jobs
  startScheduledJobs();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case 'servers':
        await handleServersCommand(interaction);
        break;
      case 'connect':
        await handleConnectCommand(interaction);
        break;
      case 'wipe':
        await handleWipeCommand(interaction);
        break;
      case 'status':
        await handleStatusCommand(interaction);
        break;
    }
  } catch (error) {
    console.error(`Error handling ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'An error occurred!', ephemeral: true }).catch(() => {});
  }
});

async function startScheduledJobs() {
  console.log('🕐 Starting scheduled jobs...');

  // Update server status every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const channel = (await client.channels.fetch(BOT_CONFIG.statusChannel)) as TextChannel;
      if (!channel || channel.type !== ChannelType.GuildText) return;

      const serverData = await Promise.all(
        SERVERS.map(async (server) => {
          const players = await fetchPlayerCount(server.id);
          return { ...server, ...players };
        })
      );

      const embed = createStatusCheckEmbed(serverData);
      const messages = await channel.messages.fetch({ limit: 1 });
      const lastMessage = messages.first();

      if (lastMessage && lastMessage.author.id === client.user?.id) {
        await lastMessage.edit({ embeds: [embed] });
      } else {
        await channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  });

  // Wipe alerts every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const channel = (await client.channels.fetch(BOT_CONFIG.announcementChannel)) as TextChannel;
      if (!channel || channel.type !== ChannelType.GuildText) return;

      for (const server of SERVERS) {
        const daysLeft = calculateWipeCountdown(server.nextWipe);
        // Send alerts 1 day before and 3 days before
        if (daysLeft === 1 || daysLeft === 3) {
          const embed = createWipeAlertEmbed(server, daysLeft);
          await channel.send({ embeds: [embed] });
        }
      }
    } catch (error) {
      console.error('Error sending wipe alerts:', error);
    }
  });

  console.log('✅ Scheduled jobs started');
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Start the bot
client.login(BOT_CONFIG.token);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Bot shutting down...');
  await client.destroy();
  process.exit(0);
});

export default client;
