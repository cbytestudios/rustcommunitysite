import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Github, MessageCircle, ArrowUpRight } from 'lucide-react';
export const Footer = () => {
    const linkVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.4,
            },
        }),
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    const links = [
        { label: 'Servers', href: '#servers' },
        { label: 'Shop', href: '/shop' },
        { label: 'Rules', href: '/rules' },
        { label: 'Discord', href: 'https://discord.gg/rustborne' },
        { label: 'Email', href: 'mailto:support@rustborne.com' },
        { label: 'Staff', href: '/staff' },
    ];
    return (_jsxs("footer", { className: "bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a] border-t border-[#e04d1a]/20 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-[#e04d1a] rounded-full blur-3xl opacity-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none" }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 relative z-10", children: [_jsxs(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, children: [_jsxs(motion.div, { variants: linkVariants, custom: 0, children: [_jsx("h3", { className: "text-2xl font-black text-[#e04d1a] mb-4 neon-text tracking-wider", children: "RUSTBORNE" }), _jsx("p", { className: "text-gray-400 text-sm leading-relaxed font-light", children: "Post-apocalyptic PVE/PVP havens with weekly wipes, epic events, and endless possibilities." })] }), _jsxs(motion.div, { variants: linkVariants, custom: 1, children: [_jsx("h4", { className: "font-black text-white mb-6 text-sm uppercase tracking-widest", children: "Navigation" }), _jsx("ul", { className: "space-y-3", children: ['Servers', 'Shop', 'Rules'].map((link, i) => (_jsx(motion.li, { custom: i, variants: linkVariants, children: _jsxs("a", { href: link === 'Servers' ? '#servers' : `/${link.toLowerCase()}`, className: "text-gray-400 hover:text-[#e04d1a] transition-colors duration-300 text-sm font-medium flex items-center gap-2 group", children: [_jsx("span", { className: "w-0 h-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33] group-hover:w-4 transition-all duration-300" }), link] }) }, link))) })] }), _jsxs(motion.div, { variants: linkVariants, custom: 2, children: [_jsx("h4", { className: "font-black text-white mb-6 text-sm uppercase tracking-widest", children: "Support" }), _jsx("ul", { className: "space-y-3", children: [
                                            { label: 'Discord', href: 'https://discord.gg/rustborne' },
                                            { label: 'Email', href: 'mailto:support@rustborne.com' },
                                            { label: 'Staff', href: '/staff' },
                                        ].map((link, i) => (_jsx(motion.li, { custom: i, variants: linkVariants, children: _jsxs("a", { href: link.href, target: link.href.startsWith('http') ? '_blank' : undefined, rel: link.href.startsWith('http') ? 'noreferrer' : undefined, className: "text-gray-400 hover:text-[#e04d1a] transition-colors duration-300 text-sm font-medium flex items-center gap-2 group", children: [_jsx("span", { className: "w-0 h-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33] group-hover:w-4 transition-all duration-300" }), link.label, link.href.startsWith('http') && _jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })] }) }, link.label))) })] }), _jsxs(motion.div, { variants: linkVariants, custom: 3, children: [_jsx("h4", { className: "font-black text-white mb-6 text-sm uppercase tracking-widest", children: "Connect" }), _jsxs("div", { className: "flex gap-4 mb-6", children: [_jsx(motion.a, { href: "https://discord.gg/rustborne", target: "_blank", rel: "noreferrer", className: "p-3 rounded-lg bg-[#1a1a1a] border border-[#e04d1a]/30 text-[#e04d1a] hover:bg-[#e04d1a] hover:text-white transition-all duration-300 group", whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: _jsx(MessageCircle, { className: "w-5 h-5" }) }), _jsx(motion.a, { href: "https://github.com/rustborne", target: "_blank", rel: "noreferrer", className: "p-3 rounded-lg bg-[#1a1a1a] border border-[#e04d1a]/30 text-[#e04d1a] hover:bg-[#e04d1a] hover:text-white transition-all duration-300", whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: _jsx(Github, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs font-mono text-[#e04d1a]/70", children: [_jsx(motion.div, { className: "w-2 h-2 bg-green-500 rounded-full", animate: { boxShadow: ['0 0 5px #22c55e', '0 0 15px #22c55e', '0 0 5px #22c55e'] }, transition: { duration: 2, repeat: Infinity } }), _jsx("span", { children: "All systems operational" })] })] })] }), _jsx(motion.div, { className: "border-t border-[#e04d1a]/20 pt-8", initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { delay: 0.3, duration: 0.5 }, viewport: { once: true }, children: _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500", children: [_jsxs("p", { className: "font-light", children: ["\u00A9 2025 ", _jsx("span", { className: "text-[#e04d1a] font-bold", children: "Rustborne" }), ". All rights reserved."] }), _jsx(motion.p, { className: "text-[#e04d1a]/60", animate: { opacity: [0.6, 1, 0.6] }, transition: { duration: 2, repeat: Infinity }, children: "Crafted with \u26A1 for the community" })] }) })] })] }));
};
export default Footer;
