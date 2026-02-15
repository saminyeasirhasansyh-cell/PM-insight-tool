
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Target,
    MessageSquare,
    Zap,
    AlertTriangle,
    FileText,
    Ghost,
    Search,
    History,
    Skull,
    ScanFace
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './components/ui/Toast';

import { Dashboard } from './features/Dashboard';
import { CompetitiveIntel } from './features/CompetitiveIntel';
import { BlindSpotMirror } from './features/BlindSpotMirror';
import { Feedback } from './features/Feedback';
import { SprintRisks } from './features/SprintRisks';
import { StakeholderUpdates } from './features/StakeholderUpdates';
import { PrdDrafting } from './features/PrdDrafting';
import { SilentDiscovery } from './features/SilentDiscovery';
import { PainVsOpp } from './features/PainVsOpp';
import { DecisionLogs } from './features/DecisionLogs';
import { PreMortem } from './features/PreMortems';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
    >
        {children}
    </motion.div>
);

function App() {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/competitive', icon: Target, label: 'Competitive Intel' },
        { path: '/feedback', icon: MessageSquare, label: 'Customer Feedback' },
        { path: '/updates', icon: Zap, label: 'Updates' },
        { path: '/risks', icon: AlertTriangle, label: 'Sprint Risks' },
        { path: '/prd', icon: FileText, label: 'PRD Drafting' },
        { path: '/discovery', icon: Ghost, label: 'Silent Discovery' },
        { path: '/pain-opp', icon: Search, label: 'Pain vs Opp' },
        { path: '/decisions', icon: History, label: 'Decision Logs' },
        { path: '/pre-mortem', icon: Skull, label: 'Pre-mortems' },
        { path: '/blind-spots', icon: ScanFace, label: 'Blind Spots' },
    ];

    return (
        <div className="flex h-screen w-full bg-background text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 flex flex-col glass-panel m-2 rounded-xl">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Insight Engine
                    </h1>
                </div>

                <nav className="flex-1 overflow-y-auto px-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-primary/20 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} className={`${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-white'}`} />
                                <span className="font-medium text-sm">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        <div className="text-sm">
                            <div className="font-medium">User</div>
                            <div className="text-xs text-gray-500">Product Manager</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <main className="flex-1 overflow-y-auto p-4 z-10">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
                            <Route path="/competitive" element={<PageWrapper><CompetitiveIntel /></PageWrapper>} />
                            <Route path="/feedback" element={<PageWrapper><Feedback /></PageWrapper>} />
                            <Route path="/updates" element={<PageWrapper><StakeholderUpdates /></PageWrapper>} />
                            <Route path="/risks" element={<PageWrapper><SprintRisks /></PageWrapper>} />
                            <Route path="/prd" element={<PageWrapper><PrdDrafting /></PageWrapper>} />
                            <Route path="/discovery" element={<PageWrapper><SilentDiscovery /></PageWrapper>} />
                            <Route path="/pain-opp" element={<PageWrapper><PainVsOpp /></PageWrapper>} />
                            <Route path="/decisions" element={<PageWrapper><DecisionLogs /></PageWrapper>} />
                            <Route path="/pre-mortem" element={<PageWrapper><PreMortem /></PageWrapper>} />
                            <Route path="/blind-spots" element={<PageWrapper><BlindSpotMirror /></PageWrapper>} />
                        </Routes>
                    </AnimatePresence>
                </main>

                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>
            </div>
        </div>
    );
}

const AppWrapper = () => (
    <ToastProvider>
        <App />
    </ToastProvider>
);

export default AppWrapper;
