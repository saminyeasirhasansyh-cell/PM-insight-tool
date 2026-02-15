import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Target, Globe, ArrowUpRight, Zap, Plus, X, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';

const initialCompetitors = [
    {
        id: 1,
        name: 'Acme Corp',
        url: 'acme.com',
        status: 'High Threat',
        lastUpdate: '2 days ago',
        changes: [
            { type: 'feature', description: 'Launched "Teams" feature similar to our roadmap item #4' },
            { type: 'pricing', description: 'Changed enterprise pricing to seat-based' }
        ]
    },
    {
        id: 2,
        name: 'BetaInc',
        url: 'betainc.io',
        status: 'Monitor',
        lastUpdate: '5 days ago',
        changes: [
            { type: 'marketing', description: 'New landing page targeting our niche' }
        ]
    },
    {
        id: 3,
        name: 'GammaRay',
        url: 'gammaray.tech',
        status: 'Low Threat',
        lastUpdate: '1 week ago',
        changes: []
    }
];

export const CompetitiveIntel = () => {
    const [competitors, setCompetitors] = useState(initialCompetitors);
    const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
    const { toast } = useToast();

    const handleGenerateReport = () => {
        toast("Analyzing 3 scan clusters...", "info");
        setTimeout(() => {
            toast("Weekly Landscape Analysis generated.", "success");
        }, 1500);
    };

    const handleAddCompetitor = () => {
        if (!newCompetitorUrl) return;

        toast("Scanning domain for intel...", "info");

        setTimeout(() => {
            const newId = Date.now();
            const name = newCompetitorUrl.split('.')[0];
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

            setCompetitors(prev => [...prev, {
                id: newId,
                name: capitalizedName,
                url: newCompetitorUrl,
                status: 'Monitor',
                lastUpdate: 'Just now',
                changes: []
            }]);

            setIsAdding(false);
            setNewCompetitorUrl('');
            toast(`${capitalizedName} added to tracking.`, 'success');
            setSelectedCompetitor(newId);
        }, 1200);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Target className="w-8 h-8 text-rose-500" />
                        Competitive Intelligence
                    </h1>
                    <p className="text-gray-400 mt-2">Automated tracking and weekly synthesis of the landscape.</p>
                </div>
                <Button variant="primary" className="gap-2" onClick={handleGenerateReport}>
                    <Zap className="w-4 h-4" /> Generate Weekly Report
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Competitor List */}
                <div className="space-y-4">
                    {competitors.map((comp) => (
                        <Card
                            key={comp.id}
                            onClick={() => setSelectedCompetitor(comp.id)}
                            className={`cursor-pointer transition-all ${selectedCompetitor === comp.id ? 'border-rose-500/50 bg-rose-500/5 ring-1 ring-rose-500/20' : 'hover:bg-white/5'}`}
                        >
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-gray-300">
                                    {comp.name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-white">{comp.name}</h4>
                                        <Badge variant={comp.status === 'High Threat' ? 'danger' : comp.status === 'Monitor' ? 'warning' : 'neutral'}>
                                            {comp.status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{comp.url}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Button
                        variant="outline"
                        className="w-full border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 gap-2"
                        onClick={() => setIsAdding(true)}
                    >
                        <Plus className="w-4 h-4" /> Add Competitor
                    </Button>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2">
                    <motion.div
                        key={selectedCompetitor || 'empty'}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {selectedCompetitor ? (
                            (() => {
                                const comp = competitors.find(c => c.id === selectedCompetitor)!;
                                return (
                                    <Card className="h-full border-white/10">
                                        <CardHeader className="border-b border-white/5 pb-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-2xl">{comp.name}</CardTitle>
                                                    <a href={`https://${comp.url}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 mt-2 text-sm">
                                                        {comp.url} <ArrowUpRight className="w-3 h-3" />
                                                    </a>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-400">Last scanned</div>
                                                    <div className="text-white font-mono">{comp.lastUpdate}</div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-8 pt-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-4">Recent Detects</h3>
                                                {comp.changes.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {comp.changes.map((change, i) => (
                                                            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10 flex gap-4">
                                                                <div className={`p-2 rounded ${change.type === 'feature' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'} h-fit`}>
                                                                    <Zap className="w-4 h-4" />
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{change.type}</span>
                                                                    <p className="text-gray-200 mt-1">{change.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-8 text-center bg-white/5 rounded-lg border-2 border-dashed border-white/10">
                                                        <div className="flex justify-center mb-3">
                                                            <Globe className="w-8 h-8 text-gray-600" />
                                                        </div>
                                                        <p className="text-gray-400">No significant visual or code changes detected on this property recently.</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-4">AI Synthesis</h3>
                                                <div className="p-6 rounded-xl bg-gradient-to-br from-rose-900/10 to-purple-900/10 border border-white/10">
                                                    <p className="text-gray-300 leading-relaxed">
                                                        <span className="text-rose-400 font-semibold">Risk Analysis:</span> {comp.name} seems to be moving upmarket.
                                                        Recommend revisiting our <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => toast("Added 'Review Enterprise Strategy' to To-Do list.")}>Enterprise Strategy</span> doc.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })()
                        ) : (
                            <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
                                <div className="text-center text-gray-500">
                                    <Target className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Select a competitor to view insights</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Dialog isOpen={isAdding} onClose={() => setIsAdding(false)} title="Track New Competitor">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Domain URL</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                            placeholder="e.g. linear.app"
                            value={newCompetitorUrl}
                            onChange={e => setNewCompetitorUrl(e.target.value)}
                        />
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20 text-xs text-blue-300">
                        <Info className="w-3 h-3 inline mr-1" />
                        We will scan for pricing changes, feature announcements, and visual regression.
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleAddCompetitor} disabled={!newCompetitorUrl}>Start Tracking</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

