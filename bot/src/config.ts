export interface ServerConfig {
  id: string;
  name: string;
  ip: string;
  port: number;
  region: "NA" | "EU" | "AS";
  mode: "PVE" | "PVP";
  multiplier: string;
  map: string;
  features: string[];
  nextWipe: string;
  description: string;
}

export const SERVERS: ServerConfig[] = [
  {
    id: "12345",
    name: "Rustborne NA 5x",
    ip: "play.rustborne.com",
    port: 28015,
    region: "NA",
    mode: "PVP",
    multiplier: "5x",
    map: "Procedural 3500",
    features: ["Kits", "Zombies", "Weekly Wipes", "Events"],
    nextWipe: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "High-action PVP with 5x gather. Wipes every Thursday.",
  },
  {
    id: "12346",
    name: "Rustborne EU 2x",
    ip: "eu.rustborne.com",
    port: 28015,
    region: "EU",
    mode: "PVE",
    multiplier: "2x",
    map: "Procedural 3000",
    features: ["SafeZones", "Kits", "Peaceful"],
    nextWipe: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Chill PVE experience with safe zones and community events.",
  },
  {
    id: "12347",
    name: "Rustborne Hardcore",
    ip: "hardcore.rustborne.com",
    port: 28015,
    region: "NA",
    mode: "PVP",
    multiplier: "1x",
    map: "Procedural 4000",
    features: ["Vanilla+", "No Plugins", "Weekly Wipes"],
    nextWipe: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Pure vanilla Rust. No mods, no plugins. Maximum challenge.",
  },
  {
    id: "12348",
    name: "Rustborne Asia",
    ip: "asia.rustborne.com",
    port: 28015,
    region: "AS",
    mode: "PVP",
    multiplier: "3x",
    map: "Procedural 2500",
    features: ["Kits", "Zombies", "Events"],
    nextWipe: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Balanced PVP for Asian and AU players. 3x resources.",
  },
  {
    id: "12349",
    name: "Rustborne Training",
    ip: "training.rustborne.com",
    port: 28015,
    region: "NA",
    mode: "PVE",
    multiplier: "10x",
    map: "Procedural 2000",
    features: ["High Gather", "No Wipes", "Build Safe"],
    nextWipe: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Perfect for learning Rust. No wipes, super high gather.",
  },
  {
    id: "12350",
    name: "Rustborne Events",
    ip: "events.rustborne.com",
    port: 28015,
    region: "NA",
    mode: "PVP",
    multiplier: "7x",
    map: "Procedural 3000",
    features: ["Events", "Tournaments", "Leaderboards", "Rewards"],
    nextWipe: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Competitive server with weekly events and prize pools.",
  },
];

export const BOT_CONFIG = {
  token: process.env.DISCORD_TOKEN!,
  webhookSecret: process.env.BM_WEBHOOK_SECRET!,
  statusChannel: process.env.STATUS_CHANNEL_ID!,
  announcementChannel: process.env.ANNOUNCEMENT_CHANNEL_ID!,
};

export const COLORS = {
  primary: 0xe04d1a, // rust-orange
  success: 0x22c55e,
  warning: 0xf59e0b,
  error: 0xef4444,
};
