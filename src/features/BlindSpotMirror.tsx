import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScanFace, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlindSpotMirror = () => {
    const [input, setInput] = useState('');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!input.trim()) return;
        setLoading(true);

        // Simulate API call or call real endpoint
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAnalysis("You're heavily indexing on power users here. Have you considered the cold-start experience for a complete novice? Also, your assumption about 'weekly synthesis' assumes high-frequency usage, which might not be true for all stakeholders.");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <ScanFace className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Blind Spot Mirror</h1>
                    <p className="text-gray-400">AI-powered critique to challenge your product thinking.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Your Thinking</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        <textarea
                            className="w-full h-64 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                            placeholder="Paste your PRD, feature idea, or strategy here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="mt-auto pt-4 flex justify-end">
                            <Button onClick={handleAnalyze} disabled={loading || !input} className="w-full md:w-auto">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 animate-spin" /> Analyzing...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <ScanFace className="w-4 h-4" /> Reveal Blind Spots
                                    </span>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-full border-purple-500/20 bg-purple-900/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-purple-400" />
                            Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {analysis ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="prose prose-invert"
                            >
                                <p className="text-lg text-gray-200 leading-relaxed">
                                    {analysis}
                                </p>

                                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Suggested Actions</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                                        <li>Interview 3 churned users to validate.</li>
                                        <li>Check retention cohort data for week 1 drop-off.</li>
                                    </ul>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                <ScanFace className="w-16 h-16 opacity-20" />
                                <p>Waiting for input...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
