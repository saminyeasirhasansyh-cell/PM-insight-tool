import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skull, Play, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';

export const PreMortem = () => {
    const [running, setRunning] = useState(false);
    const [scenarios, setScenarios] = useState<{ title: string, desc: string, prob: number }[]>([]);
    const [selectedScenario, setSelectedScenario] = useState<{ title: string, desc: string } | null>(null);
    const [preventionPlan, setPreventionPlan] = useState('');
    const [savedPlans, setSavedPlans] = useState<Record<string, boolean>>({});

    const handleRun = () => {
        setRunning(true);
        setScenarios([]);
        setTimeout(() => {
            setScenarios([
                { title: "Adoption Stalls at 15%", desc: "Power users love it, but complexity alienates the core user base. Onboarding drop-off spikes.", prob: 65 },
                { title: "Competitor 'Lite' Clone", desc: "Competitor X releases a simplified, free version of our core feature, undercutting pricing.", prob: 30 }
            ]);
            setRunning(false);
        }, 2000);
    };

    const handleSavePlan = () => {
        if (selectedScenario) {
            setSavedPlans({ ...savedPlans, [selectedScenario.title]: true });
            setSelectedScenario(null);
            setPreventionPlan('');
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Skull className="w-8 h-8 text-rose-500" />
                        Pre-Mortems
                    </h1>
                    <p className="text-gray-400 mt-2">Simulate failure modes before writing a line of code.</p>
                </div>
                <Button variant="danger" onClick={handleRun} disabled={running} className="gap-2">
                    {running ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    Generate Failure Modes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full bg-surface/30 border-2 border-dashed border-white/10 flex items-center justify-center p-8">
                    <div className="text-center max-w-sm">
                        <h3 className="text-xl font-bold text-white mb-2">The Setup</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Imagine it is 6 months from now. The launch was a disaster. The product has failed.
                        </p>
                        <p className="text-white italic">
                            "Why did it fail?"
                        </p>
                    </div>
                </Card>

                <div className="space-y-4">
                    <AnimatePresence>
                        {scenarios.length > 0 ? (
                            scenarios.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <Card className="border-l-4 border-l-rose-500 overflow-hidden">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white text-lg">{s.title}</h4>
                                                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">{s.prob}% Probability</span>
                                            </div>
                                            <p className="text-gray-300 text-sm">{s.desc}</p>

                                            {savedPlans[s.title] ? (
                                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-green-400 text-sm">
                                                    <CheckCircle2 className="w-4 h-4" /> Prevention Plan Drafted
                                                </div>
                                            ) : (
                                                <div className="mt-4 pt-4 border-t border-white/5">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-xs w-full"
                                                        onClick={() => setSelectedScenario(s)}
                                                    >
                                                        Draft Prevention Plan
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                {running ? 'Simulating doom...' : 'Run verify to see potential failures'}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Dialog isOpen={!!selectedScenario} onClose={() => setSelectedScenario(null)} title="Draft Prevention Plan">
                <div className="space-y-4">
                    <div className="p-3 bg-rose-500/10 rounded border border-rose-500/20">
                        <h4 className="font-bold text-rose-300 text-sm mb-1">{selectedScenario?.title}</h4>
                        <p className="text-xs text-rose-200/70">{selectedScenario?.desc}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">What specifically will we do to prevent this?</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 h-32 resize-none"
                            placeholder="e.g. Implement rigorous A/B testing on onboarding, survey churned users weekly..."
                            value={preventionPlan}
                            onChange={(e) => setPreventionPlan(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setSelectedScenario(null)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSavePlan} disabled={!preventionPlan}>
                            <Send className="w-4 h-4 mr-2" /> Save Plan
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
