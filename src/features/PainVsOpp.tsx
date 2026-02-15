import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PainVsOpp = () => {
    const [problem, setProblem] = useState('');
    const [result, setResult] = useState<{ pain: string; opportunity: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleReframe = () => {
        if (!problem.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setResult({
                pain: "Users find current reporting tools cumbersome and lack confidence in the data accuracy.",
                opportunity: "Create a 'One-Click Trust' dashboard that surfaces data lineage and automated health checks, turning skepticism into a confidence moat."
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Search className="w-8 h-8 text-emerald-400" />
                        Pain vs Opportunity
                    </h1>
                    <p className="text-gray-400 mt-2">Turn vague problems into crisp pain-opportunity statements.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>The Vague Problem</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-400">Describe what you are hearing from users or observing in the market.</p>
                        <textarea
                            className="w-full h-48 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                            placeholder="e.g. Everyone keeps complaining that reports are hard to use..."
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleReframe} disabled={loading || !problem}>
                            {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                            {loading ? 'Reframing...' : 'Reframe'}
                        </Button>
                    </CardContent>
                </Card>

                <AnimatePresence>
                    {result && (
                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <Card className="border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-900/10 to-transparent">
                                    <CardHeader><CardTitle className="text-rose-400">The Real Pain</CardTitle></CardHeader>
                                    <CardContent>
                                        <p className="text-lg text-white font-medium leading-relaxed">"{result.pain}"</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-900/10 to-transparent">
                                    <CardHeader><CardTitle className="text-emerald-400 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> The Opportunity</CardTitle></CardHeader>
                                    <CardContent>
                                        <p className="text-lg text-white font-medium leading-relaxed">"{result.opportunity}"</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
