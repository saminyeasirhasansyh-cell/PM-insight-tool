
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Ghost, Radio, TrendingUp, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';

export const SilentDiscovery = () => {
    const [discovering, setDiscovering] = useState(true);
    const [selectedSignal, setSelectedSignal] = useState<{ id: number, title: string, desc: string, detail: React.ReactNode } | null>(null);
    const [activeSignals, setActiveSignals] = useState<number[]>([1, 2]);
    const { toast } = useToast();

    // Simulate background listening
    useEffect(() => {
        const timer = setTimeout(() => setDiscovering(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const signals = [
        {
            id: 1,
            title: "\"Export\" Friction",
            desc: "Unexpected cluster of ticket tags \"export\", \"csv\", and \"download\" appearing in Churn reasons for Enterprise plans.",
            strength: '88%',
            type: 'churn',
            detail: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Analysis of the last 30 days of churn exit surveys shows a <strong>15% correlation</strong> between users who search for "Export" and subsequently downgrade or churn within 7 days.
                    </p>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-sm font-semibold text-white mb-2">Voice of Customer Samples</h4>
                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                            <li>"I just needed to get my data out to put into Tableau and it failed 3 times."</li>
                            <li>"Why can't I just download a CSV of this table??"</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "Hidden Power User Workflow",
            desc: "5 users requested keyboard shortcuts for the exact same 3-step sequence in the last 48h.",
            strength: '64%',
            type: 'workflow',
            detail: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Users are manually performing: <strong>Open Item &rarr; Edit Details &rarr; Change Status &rarr; Save</strong> repeatedly. They are asking for a shortcut to "Approve and Next".
                    </p>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-sm font-semibold text-white mb-2">Impact Opportunity</h4>
                        <p className="text-sm text-gray-400">Implementing this shortcut could save approx. 2 hours/week for power users.</p>
                    </div>
                </div>
            )
        }
    ];

    const handleCreateTicket = () => {
        toast("Research Ticket created (RES-402)", "success");
        setSelectedSignal(null);
    };

    const handleIgnore = (id: number) => {
        setActiveSignals(prev => prev.filter(sid => sid !== id));
        setSelectedSignal(null);
        toast("Signal ignored and removed from feed.", "info");
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Ghost className="w-8 h-8 text-purple-400" />
                        Silent Discovery
                    </h1>
                    <p className="text-gray-400 mt-2">Watching tickets, churn data, and social for patterns you'd never catch.</p>
                </div>
            </div>

            {discovering ? (
                <div className="h-[400px] flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
                        <Radio className="w-24 h-24 text-purple-500 relative z-10" />
                    </motion.div>
                    <p className="mt-8 text-purple-300 font-mono animate-pulse">Scanning noise for signals...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {signals.filter(s => activeSignals.includes(s.id)).map((signal, i) => (
                            <motion.div
                                key={signal.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                transition={{ delay: i * 0.2 }}
                                layout
                            >
                                <Card
                                    className={`bg-gradient-to-br hover:shadow-2xl transition-all cursor-pointer border-l-4 ${signal.type === 'churn' ? 'from-purple-900/10 to-blue-900/10 border-l-purple-500 hover:shadow-purple-500/10' : 'from-blue-900/10 to-teal-900/10 border-l-blue-500 hover:shadow-blue-500/10'}`}
                                    onClick={() => setSelectedSignal(signal)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-2 rounded-lg ${signal.type === 'churn' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                                {signal.type === 'churn' ? <TrendingUp className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                                            </div>
                                            <span className={`text-xs font-mono px-2 py-1 rounded ${signal.type === 'churn' ? 'text-purple-400 bg-purple-500/10' : 'text-blue-400 bg-blue-500/10'}`}>
                                                Strength: {signal.strength}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{signal.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {signal.desc}
                                        </p>
                                        <Button size="sm" variant="ghost" className={`p-0 hover:bg-transparent ${signal.type === 'churn' ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'}`}>
                                            Investigate <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {activeSignals.length === 0 && (
                        <div className="col-span-full h-40 flex items-center justify-center text-gray-500 border border-white/10 rounded-xl bg-white/5">
                            No active signals detected.
                        </div>
                    )}
                </div>
            )}

            <Dialog
                isOpen={!!selectedSignal}
                onClose={() => setSelectedSignal(null)}
                title={selectedSignal?.title || ''}
            >
                {selectedSignal?.detail}
                <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                    <Button variant="primary" className="flex-1" onClick={handleCreateTicket}>Create Research Ticket</Button>
                    <Button variant="outline" className="flex-1" onClick={() => selectedSignal && handleIgnore(selectedSignal.id)}>Ignore Signal</Button>
                </div>
            </Dialog>
        </div>
    );
};
