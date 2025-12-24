import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Clock, Gamepad2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { calculateWipeCountdown, getPlayerPercentage, fetchPlayerCount } from '../services/battlemetrics';
export const ServerCard = ({ server }) => {
    const [players, setPlayers] = useState({ current: 0, max: 0 });
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const wipeCountdown = calculateWipeCountdown(server.nextWipe);
    const playerPercentage = getPlayerPercentage(players.current, players.max);
    const imageUrl = `/servers/${server.id}.jpg`;
    useEffect(() => {
        const fetchPlayers = async () => {
            setLoading(true);
            const data = await fetchPlayerCount(server.id);
            setPlayers(data);
            setLoading(false);
        };
        fetchPlayers();
        const interval = setInterval(fetchPlayers, 30000);
        return () => clearInterval(interval);
    }, [server.id]);
    const handleConnect = () => {
        const steamConnect = `steam://connect/${server.ip}:${server.port}`;
        navigator.clipboard.writeText(steamConnect);
        toast.success(`Connect command copied! Paste in Steam: ${steamConnect}`);
    };
    const playerRingColor = playerPercentage > 75 ? 'text-red-500' : playerPercentage > 50 ? 'text-yellow-500' : 'text-green-500';
    const cardVariants = {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        inView: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.23, 1, 0.320, 1] }
        },
        hover: { y: -8, transition: { duration: 0.3 } }
    };
    return (_jsxs(motion.div, { className: "card-modern card-hover-modern group relative overflow-hidden", initial: "initial", whileInView: "inView", whileHover: "hover", onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false), transition: { duration: 0.3 }, viewport: { once: true }, variants: cardVariants, children: [_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-[#e04d1a]/0 via-[#e04d1a]/0 to-[#e04d1a]/0 opacity-0 group-hover:opacity-20", animate: isHovering ? { opacity: [0, 0.3, 0] } : { opacity: 0 }, transition: { duration: 0.6, repeat: Infinity } }), _jsxs("div", { className: "relative h-40 bg-gradient-to-br from-[#e04d1a] to-[#ff6a33] overflow-hidden", children: [!imageError ? (_jsx(motion.img, { src: imageUrl, alt: server.name, className: "w-full h-full object-cover", onError: () => setImageError(true), animate: isHovering ? { scale: 1.1 } : { scale: 1 }, transition: { duration: 0.4 } })) : server.bannerUrl ? (_jsx(motion.img, { src: server.bannerUrl, alt: server.name, className: "w-full h-full object-cover", animate: isHovering ? { scale: 1.1 } : { scale: 1 }, transition: { duration: 0.4 } })) : (_jsx("div", { className: "absolute inset-0 opacity-30 pattern-bg bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]" })), _jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300" }), _jsx(motion.div, { className: "absolute top-3 right-3 flex gap-2", children: server.features.slice(0, 2).map((feature) => (_jsx(motion.span, { className: "text-xs bg-[#0f0f0f]/90 text-[#e04d1a] px-2 py-1 rounded font-bold border border-[#e04d1a]/50", animate: isHovering ? { scale: 1.1 } : { scale: 1 }, transition: { duration: 0.3 }, children: feature }, feature))) })] }), _jsxs("div", { className: "p-5 bg-gradient-to-b from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-sm", children: [_jsx(motion.div, { animate: isHovering ? { color: '#ff6a33' } : { color: '#fff' }, transition: { duration: 0.3 }, children: _jsx("h3", { className: "text-xl font-black mb-1 tracking-wide", children: server.name }) }), _jsx("p", { className: "text-sm text-gray-400 mb-4 font-light h-8 line-clamp-2", children: server.description }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [_jsxs(motion.div, { className: "flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20", animate: isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "relative w-10 h-10", children: [_jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [_jsx("circle", { cx: "20", cy: "20", r: "16", stroke: "#2d2d2d", strokeWidth: "2", fill: "none" }), _jsx(motion.circle, { cx: "20", cy: "20", r: "16", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeDasharray: `${(playerPercentage / 100) * 100.5} 100.5`, className: `transition-all duration-500 ${playerRingColor}` })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Users, { className: "w-4 h-4 text-[#e04d1a]" }) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Players" }), _jsx("p", { className: "text-sm font-bold text-white", children: loading ? '...' : `${players.current}/${players.max}` })] })] }), _jsxs(motion.div, { className: "flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20", animate: isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }, transition: { duration: 0.3 }, children: [_jsx(Clock, { className: "w-4 h-4 text-[#e04d1a]" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Wipe" }), _jsxs("p", { className: "text-sm font-bold text-white", children: [wipeCountdown, "d"] })] })] }), _jsxs(motion.div, { className: "flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20", animate: isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }, transition: { duration: 0.3 }, children: [_jsx(Zap, { className: "w-4 h-4 text-[#e04d1a]" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Rate" }), _jsxs("p", { className: "text-sm font-bold text-white", children: [server.multiplier, "x"] })] })] }), _jsxs(motion.div, { className: "flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20", animate: isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }, transition: { duration: 0.3 }, children: [_jsx(Gamepad2, { className: "w-4 h-4 text-[#e04d1a]" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Map" }), _jsx("p", { className: "text-sm font-bold text-white", children: server.map.split(' ')[1] })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden border border-[#e04d1a]/20", children: _jsx(motion.div, { className: "h-full bg-gradient-to-r from-[#e04d1a] via-[#ff6a33] to-[#e04d1a] shadow-lg shadow-[#e04d1a]/50", initial: { width: 0 }, animate: { width: `${Math.max(5, 100 - wipeCountdown * 3)}%` }, transition: { duration: 0.8 } }) }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: wipeCountdown > 0 ? `Wipes ${new Date(server.nextWipe).toLocaleDateString()}` : '🔥 Wipe Today!' })] }), _jsx("div", { className: "flex flex-wrap gap-1 mb-4", children: server.features.map((feature) => (_jsx(motion.span, { className: "text-xs bg-gradient-to-r from-[#e04d1a]/20 to-[#ff6a33]/20 text-[#ff6a33] px-2.5 py-1 rounded border border-[#e04d1a]/30 font-medium", whileHover: { scale: 1.05, backgroundColor: 'rgba(224, 77, 26, 0.3)' }, children: feature }, feature))) }), _jsx(motion.button, { onClick: handleConnect, className: "btn-primary w-full font-bold relative overflow-hidden", whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, children: _jsx("span", { className: "relative z-10", children: "CONNECT" }) })] })] }));
};
export default ServerCard;
