
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { History, Plus, Calendar, User, FileText, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';

const initialDecisions = [
    { id: 1, title: 'Use Cloudflare Workers for AI Inference', date: '2025-01-15', context: 'Needed low latency and edge proximity.', status: 'Active', owner: 'Samin' },
    { id: 2, title: 'Deprecate Legacy Reporting API', date: '2024-12-10', context: 'High maintenance cost, low usage (<2%).', status: 'Completed', owner: 'Team' },
];

export const DecisionLogs = () => {
    const [decisions, setDecisions] = useState(initialDecisions);
    const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);
    const [newDecision, setNewDecision] = useState({ title: '', context: '', status: 'Active' });
    const { toast } = useToast();

    const handleSave = () => {
        setDecisions(prev => [{
            id: Date.now(),
            title: newDecision.title,
            context: newDecision.context,
            status: newDecision.status,
            owner: 'Me',
            date: new Date().toISOString().split('T')[0]
        }, ...prev]);
        setIsLogDialogOpen(false);
        setNewDecision({ title: '', context: '', status: 'Active' });
        toast("Decision logged successfully.", "success");
    };

    const handleViewDoc = () => {
        toast("Opening linked document in Notion...", "info");
    };

    const handleViewTickets = () => {
        toast("Opening 2 related JIRA tickets...", "info");
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <History className="w-8 h-8 text-cyan-400" />
                        Decision Logs
                    </h1>
                    <p className="text-gray-400 mt-2">System of record for product decisions with actual memory.</p>
                </div>
                <Button className="gap-2" onClick={() => setIsLogDialogOpen(true)}>
                    <Plus className="w-4 h-4" /> Log Decision
                </Button>
            </div>

            <div className="relative border-l border-white/10 ml-4 space-y-8 pb-12">
                {decisions.map((d, i) => (
                    <motion.div
                        key={d.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="pl-8 relative"
                    >
                        {/* Timeline dot */}
                        <div className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-black" />

                        <Card className="hover:bg-white/5 transition-colors group">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {d.date}</span>
                                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {d.owner}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{d.title}</h3>
                                        <p className="text-gray-400">{d.context}</p>
                                    </div>
                                    <Badge variant={d.status === 'Active' ? 'success' : 'neutral'}>{d.status}</Badge>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                                    <Button size="sm" variant="ghost" className="text-xs text-gray-400 hover:text-white gap-2" onClick={handleViewDoc}>
                                        <FileText className="w-3 h-3" /> View Document
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-xs text-gray-400 hover:text-white gap-2" onClick={handleViewTickets}>
                                        <LinkIcon className="w-3 h-3" /> Related Tickets
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Dialog isOpen={isLogDialogOpen} onClose={() => setIsLogDialogOpen(false)} title="Log New Decision">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Decision Title</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            value={newDecision.title}
                            onChange={(e) => setNewDecision({ ...newDecision, title: e.target.value })}
                            placeholder="e.g. Switch database provider"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Context / Why?</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 h-32 resize-none"
                            value={newDecision.context}
                            onChange={(e) => setNewDecision({ ...newDecision, context: e.target.value })}
                            placeholder="Explain the rationale..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Status</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            value={newDecision.status}
                            onChange={(e) => setNewDecision({ ...newDecision, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Experimental">Experimental</option>
                            <option value="Deprecated">Deprecated</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setIsLogDialogOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave} disabled={!newDecision.title}>Save Decision</Button>
                </div>
            </Dialog>
        </div>
    );
};
