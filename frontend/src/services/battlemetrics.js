const BM_BASE_URL = "https://api.battlemetrics.com";
export const fetchPlayerCount = async (serverId) => {
    try {
        const response = await fetch(`${BM_BASE_URL}/servers/${serverId}?include=player`, { headers: { Accept: "application/vnd.api+json" } });
        if (!response.ok) {
            return { current: 0, max: 0 };
        }
        const data = await response.json();
        const { players, maxPlayers } = data.data.attributes;
        return {
            current: players || 0,
            max: maxPlayers || 0,
        };
    }
    catch (error) {
        console.error("Failed to fetch BattleMetrics:", error);
        return { current: 0, max: 0 };
    }
};
export const calculateWipeCountdown = (nextWipeDate) => {
    const now = new Date();
    const wipeDate = new Date(nextWipeDate);
    const diffTime = wipeDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
export const getPlayerPercentage = (current, max) => {
    if (max === 0)
        return 0;
    return Math.round((current / max) * 100);
};
