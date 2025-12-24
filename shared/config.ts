/**
 * Shared server configuration for frontend and Discord bot
 * BattleMetrics IDs and server metadata
 */

export interface ServerConfig {
  id: string; // BattleMetrics Server ID
  name: string;
  ip: string;
  port: number;
  region: "NA" | "EU" | "AS";
  mode: "PVE" | "PVP";
  multiplier: string; // e.g., "5x"
  map: string; // e.g., "Procedural 3500"
  features: string[]; // e.g., ["Kits", "Zombies", "Events"]
  nextWipe: string; // ISO date string
  description: string;
  bannerUrl?: string;
}

export const SERVERS: ServerConfig[] = [
  {
    id: "12345",
    name: "Rustcommunity NA 5x",
    ip: "play.rustcommunity.com",
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
    name: "Rustcommunity EU 2x",
    ip: "eu.rustcommunity.com",
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
    name: "Rustcommunity Hardcore",
    ip: "hardcore.rustcommunity.com",
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
    name: "Rustcommunity Asia",
    ip: "asia.rustcommunity.com",
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
    name: "Rustcommunity Training",
    ip: "training.rustcommunity.com",
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
    name: "Rustcommunity Events",
    ip: "events.rustcommunity.com",
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

export const RANKS = [
  { tier: "Bronze", price: 5, perks: ["No Decay", "Starter Kit"] },
  { tier: "Silver", price: 10, perks: ["No Decay", "Weekly Kit", "Claim Plot"] },
  { tier: "Gold", price: 12, perks: ["No Decay", "Weekly Kit", "Claim Plot", "Custom Sign"] },
  { tier: "Elite", price: 15, perks: ["No Decay", "Weekly Kit", "Claim Plot", "Custom Sign", "Priority Slot"] },
];

export const SITE_CONFIG = {
  title: "Rustcommunity",
  tagline: "PVE/PVP Havens | Kits/Zombies | Weekly Wipes",
  discordUrl: "https://discord.gg/rustcommunity",
  tebexShop: "https://rustcommunity.tebex.io",
  colors: {
    primary: "#e04d1a", // rust-orange
    dark: "#0f0f0f", // charcoal
    accent: "#2d2d2d", // ash
  },
};
