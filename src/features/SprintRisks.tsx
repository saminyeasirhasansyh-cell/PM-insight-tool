import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, CheckCircle2, RefreshCw, ChevronRight, Ticket, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';

const initialRisks = [
    { id: 1, title: 'Backend API Latency', probability: 'High', impact: 'High', description: 'Search query performance is degrading with larger datasets.', mitigation: 'Cache optimization scheduled.', ticketCount: 3, assignee: 'Unassigned' },
    { id: 2, title: 'Design Handoff Delay', probability: 'Medium', impact: 'Medium', description: 'Settings page mocks are 2 days behind schedule.', mitigation: 'Meeting with design lead set.', ticketCount: 1, assignee: 'Unassigned' },
];

export const SprintRisks = () => {
    const [risks, setRisks] = useState(initialRisks);
    const [scanning, setScanning] = useState(false);
    const [selectedRisk, setSelectedRisk] = useState<typeof initialRisks[0] | null>(null);
    const [viewTicketsRisk, setViewTicketsRisk] = useState<typeof initialRisks[0] | null>(null);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setRisks(prev => [
                { id: 3, title: 'QA Bottleneck', probability: 'Medium', impact: 'High', description: 'Only 1 QA engineer available for release week.', mitigation: 'Suggest feature flag rollout.', ticketCount: 5, assignee: 'Unassigned' },
                ...prev
            ]);
            setScanning(false);
        }, 2000);
    };

    const handleAssign = (id: number) => {
        setRisks(prev => prev.map(r => r.id === id ? { ...r, assignee: 'Assigned to You' } : r));
        setSelectedRisk(null);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                        Sprint Risk Detection
                    </h1>
                    <p className="text-gray-400 mt-2">Real-time analysis of JIRA tickets, PRs, and team capacity.</p>
                </div>
                <Button onClick={handleScan} disabled={scanning} className="gap-2">
                    {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {scanning ? 'Scanning...' : 'Scan for Risks'}
                </Button>
            </div>

            <div className="grid gap-6">
                <AnimatePresence>
                    {risks.map((risk) => (
                        <motion.div
                            key={risk.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            layout
                        >
                            <Card className="border-l-4 border-l-amber-500 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-white">{risk.title}</h3>
                                            <Badge variant={risk.probability === 'High' ? 'danger' : 'warning'}>{risk.probability} Prob</Badge>
                                            <Badge variant={risk.impact === 'High' ? 'danger' : 'neutral'}>{risk.impact} Impact</Badge>
                                            {risk.assignee !== 'Unassigned' && <Badge variant="success">Assigned</Badge>}
                                        </div>
                                        <p className="text-gray-300">{risk.description}</p>

                                        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                            <div>
                                                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">Suggested Action</span>
                                                <p className="text-sm text-gray-400">{risk.mitigation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-[150px]">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setViewTicketsRisk(risk)}
                                        >
                                            View {risk.ticketCount} Tickets
                                        </Button>
                                        {risk.assignee === 'Unassigned' ? (
                                            <Button variant="primary" size="sm" className="gap-2" onClick={() => setSelectedRisk(risk)}>
                                                Assign Action <ChevronRight className="w-3 h-3" />
                                            </Button>
                                        ) : (
                                            <Button variant="ghost" size="sm" disabled className="text-gray-500 cursor-not-allowed">
                                                Action Assigned
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* View Tickets Modal */}
            <Dialog
                isOpen={!!viewTicketsRisk}
                onClose={() => setViewTicketsRisk(null)}
                title={`Tickets: ${viewTicketsRisk?.title}`}
            >
                <div className="space-y-3">
                    {[...Array(viewTicketsRisk?.ticketCount || 0)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
                            <div className="flex items-center gap-3">
                                <Ticket className="w-4 h-4 text-blue-400" />
                                <div>
                                    <div className="text-sm font-medium text-white">PROJ-{100 + i}: Fix latency in sub-module</div>
                                    <div className="text-xs text-gray-500">Status: In Progress</div>
                                </div>
                            </div>
                            <Badge variant="neutral">Critical</Badge>
                        </div>
                    ))}
                </div>
            </Dialog>

            {/* Assign Action Modal */}
            <Dialog
                isOpen={!!selectedRisk}
                onClose={() => setSelectedRisk(null)}
                title="Assign Action Owner"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setSelectedRisk(null)}>Cancel</Button>
                        <Button variant="primary" onClick={() => selectedRisk && handleAssign(selectedRisk.id)}>Confirm Assignment</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-gray-300">Who should lead the mitigation for <strong>{selectedRisk?.title}</strong>?</p>

                    <div className="space-y-2">
                        {['Sarah Engineering', 'Mike Design', 'Self (Me)'].map(user => (
                            <div key={user} className="flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer border border-transparent hover:border-white/10 transition-colors"
                                onClick={() => selectedRisk && handleAssign(selectedRisk.id)}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                                    {user.split(' ')[0][0]}
                                </div>
                                <span className="text-white">{user}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
