import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PrdDraftingSourceDialog } from './PrdDraftingDialog'; // We will create this
import { FileText, Sparkles, Wand2, Download, FileJson, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '../components/ui/Dialog';

export const PrdDrafting = () => {
    const [drafting, setDrafting] = useState(false);
    const [content, setContent] = useState('');
    const [selectedSources, setSelectedSources] = useState<string[]>(['User Interviews Q3', 'Competitor Analysis']);
    const [isSourceDialogOpen, setIsSourceDialogOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('Standard PRD');
    const [copied, setCopied] = useState(false);

    const handleDraft = () => {
        setDrafting(true);
        const formatPrefix = selectedFormat === 'Standard PRD' ? 'Product Requirement Document' : selectedFormat;

        setTimeout(() => {
            setContent(`# ${formatPrefix}: "Silent Discovery" Feature

## 1. Problem Statement
Users are overwhelmed by the volume of raw feedback and metrics. They miss subtle patterns that indicate churn risk or innovation opportunities because they are looking for specific keywords rather than semantic clusters.

## 2. Goals
- Increase "Insight Discovery Rate" by 25%.
- Reduce time-to-hypothesis for PMs from 4h to 15m.

## 3. User Stories
- As a PM, I want to be notified of emerging topics without searching for them.
- As a PM, I want to see a "virality score" for new feedback clusters.

## 4. Functional Requirements
- Background job processing new tickets every 1h.
- Clustering algorithm (DBSCAN or similar) on vector embeddings.
- Notification dispatch to Dashboard.

## 5. Success Metrics
- % of users who click "Action" on a discovery card.
- Weekly Active Users (WAU) of the Discovery tab.
`);
            setDrafting(false);
        }, 2000);
    };

    const handleExport = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "PRD_Draft.md";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleSource = (source: string) => {
        if (selectedSources.includes(source)) {
            setSelectedSources(prev => prev.filter(s => s !== source));
        } else {
            setSelectedSources(prev => [...prev, source]);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-400" />
                        PRD Drafting
                    </h1>
                    <p className="text-gray-400 mt-2">Turn raw research and notes into structured specs.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Context Sources</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {selectedSources.map((source, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded text-blue-400"><FileText className="w-4 h-4" /></div>
                                        <div className="text-sm">
                                            <div className="text-white">{source}</div>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-red-400" onClick={() => toggleSource(source)}>&times;</Button>
                                </div>
                            ))}
                            <Button
                                className="w-full border-dashed border-white/20 text-gray-400 hover:text-white"
                                variant="outline"
                                onClick={() => setIsSourceDialogOpen(true)}
                            >
                                + Add Research Source
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Parameters</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Format</label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {['Standard PRD', 'Amazon 6-Pager', 'User Story Map', 'Tech Spec'].map(fmt => (
                                        <Button
                                            key={fmt}
                                            variant={selectedFormat === fmt ? 'primary' : 'outline'}
                                            size="sm"
                                            onClick={() => setSelectedFormat(fmt)}
                                        >
                                            {fmt}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Button className="w-full" size="lg" onClick={handleDraft} disabled={drafting}>
                                {drafting ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                                {drafting ? 'Writing Spec...' : 'Draft PRD'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 h-[600px] flex flex-col">
                    <Card className="flex-1 bg-surface/50 flex flex-col overflow-hidden">
                        <div className="p-2 border-b border-white/10 flex justify-between items-center bg-black/20">
                            <span className="text-xs text-gray-400 px-2">draft_v1.md</span>
                            <div className="flex gap-1">
                                <Button size="sm" variant="ghost" className="h-6 text-xs gap-1 hover:bg-white/10" onClick={handleCopy} disabled={!content}>
                                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />} Copy
                                </Button>
                                <Button size="sm" variant="ghost" className="h-6 text-xs gap-1 hover:bg-white/10" onClick={handleExport} disabled={!content}>
                                    <Download className="w-3 h-3" /> Export
                                </Button>
                            </div>
                        </div>
                        {content ? (
                            <motion.textarea
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 bg-transparent p-6 font-mono text-sm leading-relaxed text-gray-300 focus:outline-none resize-none"
                                value={content}
                                readOnly
                            />
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                <FileText className="w-16 h-16 opacity-10 mb-4" />
                                <p>Select context and click Draft to generate specs.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            <Dialog
                isOpen={isSourceDialogOpen}
                onClose={() => setIsSourceDialogOpen(false)}
                title="Add Research Sources"
            >
                <div className="grid gap-2">
                    {['Gong Call Transcript - Enterprise A', 'Support Tickets (Last 7 Days)', 'Competitor Pricing Page PDF', 'Vision Doc v1'].map((src) => {
                        const isSelected = selectedSources.includes(src);
                        return (
                            <div
                                key={src}
                                className={`p-3 rounded border cursor-pointer flex items-center justify-between ${isSelected ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                onClick={() => toggleSource(src)}
                            >
                                <span className="text-white text-sm">{src}</span>
                                {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 flex justify-end">
                    <Button variant="primary" onClick={() => setIsSourceDialogOpen(false)}>Done</Button>
                </div>
            </Dialog>
        </div>
    );
};
