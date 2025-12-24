import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const StaffPage: React.FC = () => {
  const staff = [
    {
      name: 'Grumpy Old Man',
      role: 'Owner & Admin',
      bio: 'Veteran Rust server admin. Coffee addict. Keeps the peace.',
      discord: '@grumpyoldman',
      avatar: '👑',
    },
    {
      name: 'Chaos',
      role: 'Senior Admin',
      bio: 'PVP expert. Handles raids and disputes fairly.',
      discord: '@chaos',
      avatar: '⚔️',
    },
    {
      name: 'Zen',
      role: 'Moderator',
      bio: 'Community builder. PVE specialist. Always helpful.',
      discord: '@zen',
      avatar: '🧘',
    },
    {
      name: 'Nova',
      role: 'Moderator',
      bio: 'Technical wizard. Fixes bugs and issues.',
      discord: '@nova',
      avatar: '⚡',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 gradient-text tracking-wider">
            OUR STAFF
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the team keeping Rustcommunity safe and fair
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="staff-swiper"
        >
          {staff.map((member) => (
            <SwiperSlide key={member.name}>
              <motion.div
                className="card-base card-hover p-6 text-center"
                whileHover={{ y: -4 }}
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-2xl font-bold font-cinzel text-[#e04d1a] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{member.role}</p>
                <p className="text-gray-300 mb-6 text-sm">{member.bio}</p>
                <a
                  href={`https://discordapp.com/users/`}
                  className="inline-block text-sm text-[#e04d1a] hover:text-[#ff6a33] transition"
                >
                  {member.discord}
                </a>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StaffPage;
