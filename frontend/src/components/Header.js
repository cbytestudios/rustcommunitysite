import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';
export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Servers', href: '/#servers' },
        { label: 'Shop', href: '/shop' },
        { label: 'Rules', href: '/rules' },
        { label: 'Staff', href: '/staff' },
    ];
    const isActive = (href) => location.pathname === href || location.hash === href;
    const navVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
            },
        }),
    };
    return (_jsxs("header", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-[#0a0a0a]/98 border-b border-[#e04d1a]/30 shadow-lg shadow-[#e04d1a]/10'
            : 'bg-[#0f0f0f]/50 border-b border-[#e04d1a]/10'} backdrop-blur-xl`, children: [_jsxs("nav", { className: "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3 group relative", children: [_jsxs(motion.div, { className: "relative", whileHover: { scale: 1.1 }, transition: { duration: 0.3 }, children: [_jsx("img", { src: "/logo.png", alt: "Rustborne", className: "h-10 w-10 object-contain", onError: (e) => {
                                            e.target.style.display = 'none';
                                        } }), _jsx(motion.div, { className: "absolute inset-0 bg-[#e04d1a] rounded-full blur-md opacity-0 group-hover:opacity-50", transition: { duration: 0.3 } })] }), _jsx(motion.span, { className: "text-xl md:text-2xl font-bold text-[#e04d1a] tracking-wider neon-text", whileHover: { textShadow: '0 0 20px #e04d1a, 0 0 40px #e04d1a' }, transition: { duration: 0.3 }, children: "RUSTBORNE" })] }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [navItems.map((item, i) => (_jsx(motion.div, { custom: i, variants: navVariants, initial: "hidden", animate: "visible", children: _jsxs(Link, { to: item.href, className: `font-inter text-sm font-bold transition-all duration-300 relative group ${isActive(item.href)
                                        ? 'text-[#e04d1a]'
                                        : 'text-gray-400 hover:text-[#ff6a33]'}`, children: [item.label, _jsx(motion.div, { className: "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33]", initial: { width: 0 }, animate: {
                                                width: isActive(item.href) ? '100%' : 0,
                                            }, transition: { duration: 0.3 } })] }) }, item.label))), _jsxs(motion.a, { href: "https://discord.gg/rustborne", target: "_blank", rel: "noreferrer", className: "btn-primary flex items-center gap-2 relative overflow-hidden group", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: "relative z-10", children: "DISCORD" }), _jsx(ExternalLink, { className: "w-4 h-4 relative z-10" }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30", animate: { x: [-100, 100] }, transition: { duration: 0.6, repeat: Infinity } })] })] }), _jsx(motion.button, { onClick: () => setMobileOpen(!mobileOpen), className: "md:hidden text-[#e04d1a] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: mobileOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }), _jsx(motion.div, { initial: false, animate: { height: mobileOpen ? 'auto' : 0 }, transition: { duration: 0.4, ease: 'easeInOut' }, className: "md:hidden overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-t border-[#e04d1a]/20", children: _jsxs("div", { className: "p-5 space-y-3", children: [navItems.map((item, i) => (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }, transition: { delay: i * 0.08 }, children: _jsx(Link, { to: item.href, onClick: () => setMobileOpen(false), className: `block px-4 py-2 rounded-lg transition-all font-inter text-sm font-bold ${isActive(item.href)
                                    ? 'bg-[#e04d1a]/20 text-[#e04d1a] border border-[#e04d1a]/50'
                                    : 'text-gray-300 hover:text-[#e04d1a] hover:bg-[#e04d1a]/10'}`, children: item.label }) }, item.label))), _jsxs(motion.a, { href: "https://discord.gg/rustborne", target: "_blank", rel: "noreferrer", className: "btn-primary w-full text-center flex items-center justify-center gap-2", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: ["DISCORD ", _jsx(ExternalLink, { className: "w-4 h-4" })] })] }) })] }));
};
export default Header;
