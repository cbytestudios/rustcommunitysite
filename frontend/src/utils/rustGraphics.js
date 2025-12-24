/**
 * Rust-themed SVG graphics generator
 * Creates dynamic server card banners inspired by Rust game aesthetics
 */
export const generateServerBanner = (serverName, mode, multiplier, region) => {
    const isPvp = mode === 'PVP';
    const gradient1 = isPvp ? '#e04d1a' : '#22c55e';
    const gradient2 = isPvp ? '#ff6a33' : '#16a34a';
    const accentColor = isPvp ? '#fbbf24' : '#4ade80';
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E
    %3Cdefs%3E
      %3ClinearGradient id='bannerGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E
        %3Cstop offset='0%25' style='stop-color:${encodeURIComponent(gradient1)};stop-opacity:1'/%3E
        %3Cstop offset='100%25' style='stop-color:${encodeURIComponent(gradient2)};stop-opacity:1'/%3E
      %3C/linearGradient%3E
      %3Cpattern id='rustPattern' patternUnits='userSpaceOnUse' width='40' height='40'%3E
        %3Crect x='0' y='0' width='40' height='40' fill='%231a1a1a'/%3E
        %3Cpath d='M0 0 L40 40 M40 0 L0 40' stroke='%23333' stroke-width='0.5' opacity='0.3'/%3E
        %3Ccircle cx='10' cy='10' r='2' fill='%23e04d1a' opacity='0.3'/%3E
        %3Ccircle cx='30' cy='30' r='1.5' fill='%23ff6a33' opacity='0.2'/%3E
      %3C/pattern%3E
    %3C/defs%3E
    
    %3C!-- Background ---%3E
    %3Crect width='400' height='200' fill='url(%23rustPattern)'/%3E
    
    %3C!-- Gradient bar ---%3E
    %3Crect width='400' height='200' fill='url(%23bannerGrad)' opacity='0.85'/%3E
    
    %3C!-- Accent line ---%3E
    %3Cline x1='0' y1='85' x2='400' y2='85' stroke='${encodeURIComponent(accentColor)}' stroke-width='3' opacity='0.6'/%3E
    
    %3C!-- Center text with shadow ---%3E
    %3Ctext x='200' y='95' font-size='16' font-weight='bold' fill='%231a1a1a' text-anchor='middle' opacity='0.3'%3E${region} ${multiplier}%3C/text%3E
    %3Ctext x='200' y='93' font-size='16' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3E${region} ${multiplier}%3C/text%3E
    
    %3Ctext x='200' y='140' font-size='13' fill='%23ffffff' text-anchor='middle' opacity='0.8' font-weight='500'%3E${mode === 'PVP' ? '⚔️ PVP' : '🛡️ PVE'}%3C/text%3E
    
    %3C!-- Corner accents ---%3E
    %3Crect x='0' y='0' width='400' height='200' fill='none' stroke='${encodeURIComponent(accentColor)}' stroke-width='2' opacity='0.3'/%3E
  %3C/svg%3E`;
};
export const generateRustIcon = (size = 24) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24'%3E
    %3Crect x='4' y='4' width='16' height='16' fill='%23e04d1a' stroke='%23ff6a33' stroke-width='2' rx='2'/%3E
    %3Cpath d='M9 9 L15 15 M15 9 L9 15' stroke='%23ffffff' stroke-width='2' stroke-linecap='round'/%3E
  %3C/svg%3E`;
};
export const generatePlayerCountBg = (isPvp) => {
    const color = isPvp ? '%23e04d1a' : '%2322c55e';
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E
    %3Ccircle cx='24' cy='24' r='22' fill='${color}' opacity='0.1' stroke='${color}' stroke-width='1'/%3E
    %3Ctext x='24' y='28' font-size='18' font-weight='bold' fill='${color}' text-anchor='middle'%3E👥%3C/text%3E
  %3C/svg%3E`;
};
