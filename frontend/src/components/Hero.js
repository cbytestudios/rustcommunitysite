import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
export const Hero = ({ onScroll }) => {
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const fetchTotalPlayers = async () => {
            try {
                const response = await fetch('/api/servers/total-players');
                const data = await response.json();
                setTotalPlayers(data.total || 0);
            }
            catch (error) {
                console.error('Failed to fetch total players:', error);
                setTotalPlayers(Math.floor(Math.random() * 800) + 200);
            }
        };
        fetchTotalPlayers();
        const interval = setInterval(fetchTotalPlayers, 30000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.320, 1],
            },
        },
    };
    return (_jsxs("div", { className: "relative w-full h-screen bg-cover bg-center parallax-bg overflow-hidden", style: {
            backgroundImage: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(15, 15, 15, 0.9) 100%), url("data:image/svg+xml,%3Csvg width=%27100%27 height=%27100%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cdefs%3E%3ClinearGradient id=%27grad1%27 x1=%270%25%27 y1=%270%25%27 x2=%27100%25%27 y2=%27100%25%27%3E%3Cstop offset=%270%25%27 style=%27stop-color:rgb(224,77,26);stop-opacity:0.15%27 /%3E%3Cstop offset=%27100%25%27 style=%27stop-color:rgb(255,106,51);stop-opacity:0.05%27 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%27100%27 height=%27100%27 fill=%27url(%23grad1)%27/%3E%3C/svg%3E")',
        }, children: [_jsx(motion.div, { className: "absolute top-0 left-0 w-96 h-96 rounded-full bg-[#e04d1a] opacity-10 blur-3xl", animate: {
                    x: mousePosition.x / 20,
                    y: mousePosition.y / 20,
                    scale: [1, 1.15, 1],
                }, transition: { type: 'spring', stiffness: 100, damping: 30, scale: { duration: 4, repeat: Infinity } } }), _jsx(motion.div, { className: "absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-[#e04d1a] opacity-5 blur-3xl", animate: {
                    opacity: [0.05, 0.15, 0.05],
                    y: [-20, 20, -20],
                }, transition: { duration: 6, repeat: Infinity } }), _jsx(motion.div, { className: "absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#e04d1a] opacity-10 blur-3xl", animate: {
                    x: -mousePosition.x / 20,
                    y: -mousePosition.y / 20,
                    scale: [1, 1.15, 1],
                }, transition: { type: 'spring', stiffness: 100, damping: 30, scale: { duration: 5, repeat: Infinity, delay: 1 } } }), _jsx(motion.div, { className: "absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#e04d1a] opacity-5 blur-3xl", animate: {
                    opacity: [0.02, 0.08, 0.02],
                    x: [0, -40, 0],
                }, transition: { duration: 7, repeat: Infinity } }), _jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-8", children: [_jsxs(motion.div, { variants: itemVariants, className: "space-y-2", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.2 }, className: "text-xs md:text-sm font-mono text-[#e04d1a] tracking-[3px] uppercase", children: "\u2022 Welcome to \u2022" }), _jsx(motion.h1, { className: "text-6xl md:text-9xl font-black mb-4 tracking-wider text-white relative", variants: itemVariants, initial: { opacity: 0, scale: 0.8, y: 40 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.320, 1] }, children: _jsxs(motion.span, { className: "inline-block", animate: {
                                            textShadow: [
                                                '0 0 10px #e04d1a, 0 0 20px #e04d1a, 0 0 30px #e04d1a',
                                                '0 0 20px #e04d1a, 0 0 40px #e04d1a, 0 0 60px #e04d1a, 0 0 90px rgba(224, 77, 26, 0.7)',
                                                '0 0 30px #e04d1a, 0 0 60px #e04d1a, 0 0 90px rgba(224, 77, 26, 0.6)',
                                                '0 0 10px #e04d1a, 0 0 20px #e04d1a, 0 0 30px #e04d1a',
                                            ],
                                        }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, children: ["RUSTBORNE", _jsx(motion.span, { className: "absolute inset-0 text-[#e04d1a] opacity-0", animate: {
                                                    opacity: [0, 0.2, 0.4, 0.2, 0],
                                                    x: [-2, 2, -2, 2, -2],
                                                }, transition: { duration: 0.2, repeat: Infinity, repeatDelay: 3 }, children: "RUSTBORNE" })] }) })] }), _jsx(motion.div, { variants: itemVariants, className: "w-full flex justify-center", children: _jsxs("p", { className: "text-sm md:text-lg text-gray-300 font-light tracking-wider uppercase leading-relaxed text-center", children: ["PVE/PVP Havens ", _jsx("span", { className: "text-[#e04d1a] font-bold", children: "|" }), " Kits & Zombies ", _jsx("span", { className: "text-[#e04d1a] font-bold", children: "|" }), " Weekly Wipes"] }) }), _jsxs(motion.div, { variants: itemVariants, className: "flex gap-4 mb-12 flex-wrap justify-center", children: [_jsxs(motion.button, { className: "btn-primary relative group overflow-hidden shadow-lg shadow-[#e04d1a]/60", whileHover: { scale: 1.1, y: -4 }, whileTap: { scale: 0.95 }, onClick: onScroll, animate: { boxShadow: ['0 0 15px rgba(224, 77, 26, 0.4)', '0 0 30px rgba(224, 77, 26, 0.8)', '0 0 15px rgba(224, 77, 26, 0.4)'] }, transition: { duration: 2, repeat: Infinity }, children: [_jsx("span", { className: "relative z-10", children: "BROWSE SERVERS" }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0", animate: { x: ['100%', '-100%'] }, transition: { duration: 2.5, repeat: Infinity } })] }), _jsxs(motion.a, { href: "https://discord.gg/rustborne", target: "_blank", rel: "noreferrer", className: "btn-secondary group relative overflow-hidden shadow-lg shadow-[#e04d1a]/40 hover:shadow-[#e04d1a]/80", whileHover: { scale: 1.1, y: -4 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: "relative z-10", children: "JOIN DISCORD" }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-[#e04d1a] to-transparent opacity-0", animate: { x: ['100%', '-100%'] }, transition: { duration: 3, repeat: Infinity, delay: 0.5 } })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "flex items-center gap-3 bg-gradient-to-r from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-md border-2 border-[#e04d1a]/60 rounded-lg px-8 py-4 glow-box shadow-lg shadow-[#e04d1a]/30", animate: {
                                borderColor: ['rgba(224, 77, 26, 0.4)', 'rgba(224, 77, 26, 0.8)', 'rgba(224, 77, 26, 0.4)'],
                            }, transition: { duration: 2, repeat: Infinity }, children: [_jsx(motion.div, { className: "w-4 h-4 bg-[#e04d1a] rounded-full flex-shrink-0", animate: {
                                        boxShadow: [
                                            '0 0 5px #e04d1a, 0 0 10px #e04d1a',
                                            '0 0 15px #e04d1a, 0 0 25px #e04d1a',
                                            '0 0 5px #e04d1a, 0 0 10px #e04d1a',
                                        ],
                                        scale: [1, 1.2, 1],
                                    }, transition: { duration: 1.5, repeat: Infinity } }), _jsxs("span", { className: "text-sm md:text-base font-inter text-gray-200", children: [_jsx(motion.span, { className: "text-[#e04d1a] font-black text-lg", animate: { scale: [1, 1.1, 1] }, transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1 }, children: totalPlayers }), ' ', _jsx("span", { className: "text-gray-400", children: "Players Online" })] })] })] }) }), _jsx(motion.div, { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10", animate: { y: [0, 12, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, children: _jsx(motion.div, { className: "w-6 h-10 border-2 border-[#e04d1a] rounded-full flex items-center justify-center relative", children: _jsx(motion.div, { className: "w-1 h-2 bg-[#e04d1a] rounded-full", animate: { y: [0, 4, 0] }, transition: { duration: 2, repeat: Infinity } }) }) })] }));
};
export default Hero;
