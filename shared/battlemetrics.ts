/**
 * BattleMetrics API integration utilities
 * Fetch live player counts, server info, and wipe data
 */

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

const BM_BASE_URL = "https://api.battlemetrics.com";
const BM_RATE_LIMIT = 60; // requests per minute (free tier)

/**
 * Fetch current player count for a server
 * @param serverId BattleMetrics Server ID
 * @returns Player count { current, max }
 */
export const fetchPlayerCount = async (serverId: string): Promise<PlayerData> => {
  try {
    const response = await fetch(
      `${BM_BASE_URL}/servers/${serverId}?include=player`,
      { headers: { Accept: "application/vnd.api+json" } }
    );

    if (!response.ok) {
      console.error(`BM API error: ${response.status}`);
      return { current: 0, max: 0 };
    }

    const data = await response.json();
    const { players, maxPlayers } = data.data.attributes;

    return {
      current: players || 0,
      max: maxPlayers || 0,
    };
  } catch (error) {
    console.error("Failed to fetch BattleMetrics player count:", error);
    return { current: 0, max: 0 };
  }
};

/**
 * Fetch full server info
 * @param serverId BattleMetrics Server ID
 * @returns Full server data
 */
export const fetchServerInfo = async (serverId: string): Promise<BattleMetricsServer | null> => {
  try {
    const response = await fetch(`${BM_BASE_URL}/servers/${serverId}`, {
      headers: { Accept: "application/vnd.api+json" },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const { id, attributes } = data.data;

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
    console.error("Failed to fetch BattleMetrics server info:", error);
    return null;
  }
};

/**
 * Fetch multiple servers (batch)
 * @param serverIds Array of BattleMetrics Server IDs
 * @returns Array of server data
 */
export const fetchMultipleServers = async (
  serverIds: string[]
): Promise<BattleMetricsServer[]> => {
  const results = await Promise.all(serverIds.map((id) => fetchServerInfo(id)));
  return results.filter((r) => r !== null) as BattleMetricsServer[];
};

/**
 * Calculate wipe countdown in days
 * @param nextWipeDate ISO date string
 * @returns Days until wipe (or negative if past)
 */
export const calculateWipeCountdown = (nextWipeDate: string): number => {
  const now = new Date();
  const wipeDate = new Date(nextWipeDate);
  const diffTime = wipeDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get player percentage for visual rings
 * @param current Current players
 * @param max Max players
 * @returns Percentage (0-100)
 */
export const getPlayerPercentage = (current: number, max: number): number => {
  if (max === 0) return 0;
  return Math.round((current / max) * 100);
};
