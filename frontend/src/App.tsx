import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServersSection from './components/ServersSection';
import ShopPage from './pages/Shop';
import RulesPage from './pages/Rules';
import StaffPage from './pages/Staff';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      gcTime: 300000,
    },
  },
});

export const Home: React.FC = () => {
  const serversRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    serversRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onScroll={handleScroll} />
      <div ref={serversRef}>
        <ServersSection />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/staff" element={<StaffPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #e04d1a',
              },
            }}
          />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
