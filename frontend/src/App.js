import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
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
export const Home = () => {
    const serversRef = useRef(null);
    const handleScroll = () => {
        serversRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { onScroll: handleScroll }), _jsx("div", { ref: serversRef, children: _jsx(ServersSection, {}) })] }));
};
export const App = () => {
    return (_jsx(HelmetProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(Router, { children: [_jsxs("div", { className: "min-h-screen bg-[#0f0f0f] text-white flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 pt-16", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/shop", element: _jsx(ShopPage, {}) }), _jsx(Route, { path: "/rules", element: _jsx(RulesPage, {}) }), _jsx(Route, { path: "/staff", element: _jsx(StaffPage, {}) })] }) }), _jsx(Footer, {})] }), _jsx(Toaster, { position: "bottom-right", toastOptions: {
                            style: {
                                background: '#1a1a1a',
                                color: '#fff',
                                border: '1px solid #e04d1a',
                            },
                        } })] }) }) }));
};
export default App;
