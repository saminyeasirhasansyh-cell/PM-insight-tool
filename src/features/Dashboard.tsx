import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const Dashboard = () => {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Good Morning, Product Team
                    </h1>
                    <p className="text-gray-400 mt-1">Here is your insight pulse for today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm text-emerald-400 font-medium">System Active</span>
                </div>
            </div>

            {/* Key Metrics / Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-400 font-medium">Feedback Volume</p>
                                <h3 className="text-2xl font-bold text-white mt-1">+12%</h3>
                            </div>
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-blue-300/80">
                            <TrendingUp className="w-3 h-3" />
                            <span>Trending up this week</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-400 font-medium">Sprint Risk</p>
                                <h3 className="text-2xl font-bold text-white mt-1">Low</h3>
                            </div>
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-purple-300/80">
                            <span>2 items flagged for review</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-400 font-medium">Competitor Alert</p>
                                <h3 className="text-2xl font-bold text-white mt-1">1 New</h3>
                            </div>
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-amber-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-amber-300/80">
                            <span>Acme Corp launched feature X</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-400 font-medium">Drafts Ready</p>
                                <h3 className="text-2xl font-bold text-white mt-1">3</h3>
                            </div>
                            <div className="p-2 bg-pink-500/10 rounded-lg">
                                <Users className="w-5 h-5 text-pink-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-pink-300/80">
                            <span>Pending your approval</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Intel Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold text-white">Recent Insights</h2>

                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                            <CardContent className="p-4 py-3 flex items-start gap-4">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-shadow" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-white">Customer Feedback Cluster detected</h4>
                                        <span className="text-xs text-gray-500">2h ago</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                        Multiple users reporting friction in the onboarding flow specifically around step 3 (Invite Team). Potential drop-off point identified.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <Badge variant="warning">High Priority</Badge>
                                        <Badge variant="neutral">UX</Badge>
                                        <Badge variant="neutral">Onboarding</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">Active Risks</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Sprint 42 Risks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-gray-300">Backend API delay (2 days)</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                <span className="text-sm text-gray-300">Design assets missing for settings</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
