import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Zap, Mail, Slack, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const StakeholderUpdates = () => {
    const [generated, setGenerated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [format, setFormat] = useState<'email' | 'slack'>('email');

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setGenerated(true);
            setGenerating(false);
        }, 1500);
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-500" />
                        Stakeholder Updates
                    </h1>
                    <p className="text-gray-400 mt-2">Zero-effort weekly status reports based on actual progress.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Audience</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <option>Executive Leadership</option>
                                <option>Engineering Team</option>
                                <option>All Company</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Tone</label>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="bg-primary/20 border-primary/50 text-white">Concise</Button>
                                <Button size="sm" variant="outline">Detailed</Button>
                                <Button size="sm" variant="outline">Celebrate</Button>
                            </div>
                        </div>
                        <Button
                            className="w-full mt-4"
                            variant="primary"
                            onClick={handleGenerate}
                            disabled={generating}
                        >
                            {generating ? 'Drafting...' : 'Generate Update'}
                        </Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2">
                    {generated ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <Card className="bg-white/5 border-white/10">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setFormat('email')}
                                            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-colors ${format === 'email' ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            <Mail className="w-3 h-3" /> Email Format
                                        </button>
                                        <button
                                            onClick={() => setFormat('slack')}
                                            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-colors ${format === 'slack' ? 'bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            <Slack className="w-3 h-3" /> Slack Block
                                        </button>
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={handleCopy} className="hover:bg-white/10">
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </CardHeader>
                                <CardContent className="pt-6 font-mono text-sm leading-relaxed text-gray-300">
                                    {format === 'email' ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <p className="font-bold text-white mb-4">Subject: Weekly Product Update: Insight Engine Beta on Track</p>
                                            <p className="mb-4">Team,</p>
                                            <p className="mb-4">This week we successfully deployed the <span className="text-blue-400">Blind Spot Mirror</span> feature to beta users. Early feedback indicates high engagement with the AI critique tool.</p>
                                            <p className="font-bold text-white mb-2">🟢 Highlights</p>
                                            <ul className="list-disc list-inside mb-4 pl-2 space-y-1">
                                                <li>Dashboard load time reduced by 40%</li>
                                                <li>User onboarding completion rate up 5%</li>
                                                <li>Zero critical bugs in production</li>
                                            </ul>
                                            <p className="font-bold text-white mb-2">🟡 Risks</p>
                                            <ul className="list-disc list-inside mb-4 pl-2 space-y-1">
                                                <li>Backend API latency spiking on large datasets (Fix scheduled for Sprint 43)</li>
                                            </ul>
                                            <p>Next week: Focusing on "Silent Discovery" data pipeline.</p>
                                            <p className="mt-6 text-gray-500">Generated by Insight Engine</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <div className="p-4 bg-gray-800 rounded border-l-4 border-purple-500 mb-4">
                                                <p className="font-bold text-white">📢 Weekly Update</p>
                                            </div>
                                            <p className="mb-2">*Insight Engine Beta* is 🟢 On Track.</p>
                                            <p className="mb-4">Deployed: `Blind Spot Mirror` (High engagement! 🚀)</p>

                                            <p className="font-bold text-white mb-2">Highlights</p>
                                            <p className="mb-4">• Dashboard load -40%<br />• Onboarding +5%</p>

                                            <p className="font-bold text-white mb-2">Risks</p>
                                            <p className="mb-4">• API Latency (Assigned: Team A)</p>

                                            <p className="text-xs text-gray-500">View full report in Insight Engine</p>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5 text-gray-500">
                            <Zap className="w-16 h-16 opacity-20 mb-4" />
                            <p>Select options and click Generate to draft your update.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
