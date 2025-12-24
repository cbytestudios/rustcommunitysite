import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export const StaffPage = () => {
    const staff = [
        {
            name: 'Staff 1',
            role: 'Owner & Admin',
            bio: 'I am the best staff member.',
            discord: '@beststaff1',
            avatar: '👑',
        },
        
        
    ];
    return (_jsx("div", { className: "min-h-screen bg-[#0f0f0f] pt-24 pb-16", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center mb-16", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("h1", { className: "text-5xl md:text-7xl font-black mb-4 gradient-text tracking-wider", children: "OUR STAFF" }), _jsx("p", { className: "text-gray-400 text-lg max-w-2xl mx-auto", children: "Meet the team keeping Rustcommunity safe and fair" })] }), _jsx(Swiper, { modules: [Navigation, Pagination], spaceBetween: 30, slidesPerView: 1, breakpoints: {
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }, navigation: true, pagination: { clickable: true }, className: "staff-swiper", children: staff.map((member) => (_jsx(SwiperSlide, { children: _jsxs(motion.div, { className: "card-base card-hover p-6 text-center", whileHover: { y: -4 }, children: [_jsx("div", { className: "text-6xl mb-4", children: member.avatar }), _jsx("h3", { className: "text-2xl font-bold font-cinzel text-[#e04d1a] mb-1", children: member.name }), _jsx("p", { className: "text-sm text-gray-400 mb-4", children: member.role }), _jsx("p", { className: "text-gray-300 mb-6 text-sm", children: member.bio }), _jsx("a", { href: `https://discordapp.com/users/`, className: "inline-block text-sm text-[#e04d1a] hover:text-[#ff6a33] transition", children: member.discord })] }) }, member.name))) })] }) }));
};
export default StaffPage;
