
import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MessageSquare, ArrowRight, CheckCircle2, Ticket, BarChart3, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';
import { useToast } from '../components/ui/Toast';

const feedbackItems = [
    {
        id: 1,
        user: "sarah_j@company.com",
        content: "I can't find the export button on the new reporting dashboard. It used to be top right.",
        sentiment: "neutral",
        tags: ["UX", "Regression", "Reporting"],
        priority: "High",
        status: "new"
    },
    {
        id: 2,
        user: "mike.dev@startup.io",
        content: "Love the new AI suggestions, but they take too long to load. About 5 seconds.",
        sentiment: "positive",
        tags: ["Performance", "AI"],
        priority: "Medium",
        status: "new"
    },
    {
        id: 3,
        user: "enterprise_admin",
        content: "We need SSO support for our team of 500. This is a blocker for expansion.",
        sentiment: "negative",
        tags: ["Feature Request", "Enterprise", "Blocker"],
        priority: "Critical",
        status: "triaged"
    }
];

export const Feedback = () => {
    const [items, setItems] = useState(feedbackItems);
    const [processing, setProcessing] = useState<number | null>(null);
    const [batchProcessing, setBatchProcessing] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const { toast } = useToast();

    const handleTriage = (id: number) => {
        setProcessing(id);
        setTimeout(() => {
            setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'triaged' } : item));
            setProcessing(null);
            toast("Ticket created in JIRA (PROJ-224)", "success");
        }, 800);
    };

    const handleDismiss = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
        toast("Feedback dismissed.", "info");
    };

    const handleBatchProcess = () => {
        setBatchProcessing(true);
        setTimeout(() => {
            setItems(prev => prev.map(item => item.status === 'new' ? { ...item, status: 'triaged' } : item));
            setBatchProcessing(false);
            toast("Batch processing complete. 2 tickets created.", "success");
        }, 1500);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-blue-500" />
                        Customer Feedback
                    </h1>
                    <p className="text-gray-400 mt-2">Auto-triage inlet from Intercom, Email, and Slack.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="gap-2" onClick={() => setShowAnalytics(true)}>
                        <BarChart3 className="w-4 h-4" /> Analytics
                    </Button>
                    <Button
                        variant="primary"
                        className="gap-2"
                        onClick={handleBatchProcess}
                        disabled={batchProcessing || items.every(i => i.status === 'triaged')}
                    >
                        {batchProcessing ? <div className="animate-spin w-4 h-4 rounded-full border-2 border-white/30 border-t-white" /> : <CheckCircle2 className="w-4 h-4" />}
                        {batchProcessing ? 'Processing...' : 'Auto-Process Batch'}
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            layout
                        >
                            <Card className={`transition-colors ${item.status === 'triaged' ? 'opacity-60 bg-surface/30' : 'hover:bg-white/5'}`}>
                                <CardContent className="p-6 flex items-start gap-6">
                                    <div className={`w-2 h-2 rounded-full mt-2.5 ${item.priority === 'Critical' ? 'bg-red-500' : item.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`} />

                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-white font-medium">{item.user}</h4>
                                                <p className="text-gray-400 text-sm mt-1">{item.content}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-gray-500">2h ago</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {item.tags.map(tag => (
                                                <Badge key={tag} variant="neutral" className="bg-white/5 hover:bg-white/10">{tag}</Badge>
                                            ))}
                                            <div className="h-4 w-[1px] bg-white/10 mx-2" />
                                            <Badge variant={item.sentiment === 'positive' ? 'success' : item.sentiment === 'negative' ? 'danger' : 'neutral'}>
                                                {item.sentiment}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {item.status === 'new' ? (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleTriage(item.id)}
                                                disabled={processing === item.id}
                                                className="w-32"
                                            >
                                                {processing === item.id ? (
                                                    <span className="animate-pulse">Triaging...</span>
                                                ) : (
                                                    <span className="flex items-center gap-2">Create Ticket <ArrowRight className="w-3 h-3" /></span>
                                                )}
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="ghost" className="w-32 text-green-400 gap-2 cursor-default hover:text-green-400 hover:bg-transparent">
                                                <Ticket className="w-4 h-4" /> JIRA-123
                                            </Button>
                                        )}
                                        <Button size="sm" variant="ghost" className="w-32 text-gray-500 hover:text-red-400" onClick={() => handleDismiss(item.id)}>Dismiss</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                    {items.length === 0 && (
                        <div className="text-center py-20 text-gray-500 border-2 border-dashed border-white/10 rounded-xl">
                            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Inbox Zero! Nicely done.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <Dialog isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} title="Feedback Analytics">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
                        <div className="text-2xl font-bold text-white mb-1">142</div>
                        <div className="text-xs text-gray-400">Total Items (This Week)</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
                        <div className="text-xs text-gray-400">Triage Rate</div>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-white/5 rounded border border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Top Topics</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Reporting Export</span>
                            <span className="text-white font-mono">24%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                            <div className="h-full bg-blue-500 w-[24%]" />
                        </div>

                        <div className="flex justify-between text-sm mt-3">
                            <span className="text-gray-300">Login / SSO</span>
                            <span className="text-white font-mono">18%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                            <div className="h-full bg-purple-500 w-[18%]" />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
