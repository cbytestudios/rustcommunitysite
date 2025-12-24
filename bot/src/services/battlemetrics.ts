import axios from 'axios';

const BM_BASE_URL = 'https://api.battlemetrics.com';

export interface PlayerData {
  current: number;
  max: number;
}

export interface BattleMetricsServer {
  id: string;
  name: string;
  players: PlayerData;
  map?: string;
  uptime?: number;
  ping?: number;
}

export const fetchPlayerCount = async (serverId: string): Promise<PlayerData> => {
  try {
    const response = await axios.get(
      `${BM_BASE_URL}/servers/${serverId}?include=player`,
      {
        headers: { Accept: 'application/vnd.api+json' },
        timeout: 5000,
      }
    );

    const { players, maxPlayers } = response.data.data.attributes;
    return {
      current: players || 0,
      max: maxPlayers || 0,
    };
  } catch (error) {
    console.error(`BM fetch error for ${serverId}:`, error);
    return { current: 0, max: 0 };
  }
};

export const fetchServerInfo = async (serverId: string): Promise<BattleMetricsServer | null> => {
  try {
    const response = await axios.get(`${BM_BASE_URL}/servers/${serverId}`, {
      headers: { Accept: 'application/vnd.api+json' },
      timeout: 5000,
    });

    const { id, attributes } = response.data.data;
    return {
      id,
      name: attributes.name,
      players: {
        current: attributes.players || 0,
        max: attributes.maxPlayers || 0,
      },
      map: attributes.map,
      uptime: attributes.uptime,
      ping: attributes.ping,
    };
  } catch (error) {
    console.error(`BM server info error for ${serverId}:`, error);
    return null;
  }
};

export const calculateWipeCountdown = (nextWipeDate: string): number => {
  const now = new Date();
  const wipeDate = new Date(nextWipeDate);
  const diffTime = wipeDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getPlayerPercentage = (current: number, max: number): number => {
  if (max === 0) return 0;
  return Math.round((current / max) * 100);
};
