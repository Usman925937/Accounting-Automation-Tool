import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { ArrowLeft } from 'lucide-react';
import useCalculationsStore from '../../store/calculationsStore';
import { ratioDescriptions } from './ratioDescriptions';

type Category = 'profitability' | 'return' | 'solvency' | 'liquidity' | 'efficiency';

const CATEGORY_LABELS: Record<Category, string> = {
    profitability: 'Profitability Ratios',
    return: 'Return Ratios',
    solvency: 'Solvency Ratios',
    liquidity: 'Liquidity Ratios',
    efficiency: 'Efficiency Ratios'
};

const FinancialRatios: React.FC = () => {
    const { ratios } = useCalculationsStore();
    const [category, setCategory] = useState<Category>('profitability');

    // Build chart data dynamically based on selected category
    const chartData = useMemo(() => {
        const catData: { name: string; value: number | null }[] = [];

        const add = (key: string | keyof typeof ratioDescriptions, value: number | null) => {
            catData.push({ name: typeof key === 'string' ? (ratioDescriptions[key]?.title ?? key) : String(key), value });
        };

        if (category === 'profitability') {
            const p = ratios.profitability;
            add('grossProfitMargin', p.grossProfitMargin);
            add('operatingProfitMargin', p.operatingProfitMargin);
            add('pretaxMargin', p.pretaxMargin);
            add('netProfitMargin', p.netProfitMargin);
            add('cashFlowMargin', p.cashFlowMargin);
        }

        if (category === 'return') {
            const r = ratios.return;
            add('roa', r.roa);
            add('roe', r.roe);
            add('roce', r.roce);
            add('roi', r.roi);
        }

        if (category === 'solvency') {
            const s = ratios.solvency;
            add('debtToEquity', s.debtToEquity);
            add('debtRatio', s.debtRatio);
            add('interestCoverage', s.interestCoverage);
            add('equityRatio', s.equityRatio);
        }

        if (category === 'liquidity') {
            const l = ratios.liquidity;
            add('currentRatio', l.currentRatio);
            add('quickRatio', l.quickRatio);
            add('cashRatio', l.cashRatio);
        }

        if (category === 'efficiency') {
            const e = ratios.efficiency;
            add('inventoryTurnover', e.inventoryTurnover);
            add('receivablesTurnover', e.receivablesTurnover);
            add('payablesTurnover', e.payablesTurnover);
            add('assetTurnover', e.assetTurnover);
            add('fixedAssetTurnover', e.fixedAssetTurnover);
            add('workingCapitalTurnover', e.workingCapitalTurnover);
            add('operatingCycle', e.operatingCycle);
        }

        return catData;
    }, [category, ratios]);

    // Decide which chart to show: percentages (profitability/return) -> Radar, others -> Bar
    const isPercentageCategory = useMemo(() => category === 'profitability' || category === 'return', [category]);

    const formatValue = (val: number | null) => {
        if (val === null || val === undefined) return '—';
        // For percentage categories, values are already percentages in your calculateRatios
        if (isPercentageCategory) return `${val.toFixed(1)}%`;
        // For other ratios, format intelligently
        if (Math.abs(val) >= 1) return `${val.toFixed(2)}`;
        return `${(val).toFixed(2)}`;
    };

    return (
        <div className="space-y-8">
            {/* Top Row: Back + Dropdown + Heading */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/financial-health" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-white/20 hover:shadow-lg transition">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Link>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                        <label className="sr-only">Select category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="bg-transparent outline-none">
                            {Object.keys(CATEGORY_LABELS).map((k) => (
                                <option key={k} value={k}>{CATEGORY_LABELS[k as Category]}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">{CATEGORY_LABELS[category]}</h1>
                    <p className="text-sm text-gray-600">Detailed explanations and visualisations for {CATEGORY_LABELS[category].toLowerCase()}.</p>
                </div>

                <div />
            </div>

            {/* Chart Area */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
                <div style={{ height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {isPercentageCategory ? (
                            <RadarChart cx="50%" cy="50%" outerRadius={110} data={chartData.map(d => ({ name: d.name, value: d.value ?? 0 }))}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis angle={30} domain={[0, Math.max(100, ...chartData.map(d => d.value ?? 0))]} />
                                <Radar name={CATEGORY_LABELS[category]} dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                            </RadarChart>
                        ) : (
                            <BarChart data={chartData.map(d => ({ name: d.name, value: d.value ?? 0 }))} layout="vertical" margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={180} />
                                <Tooltip formatter={(value: unknown) => (value === 0 ? '—' : value)} />
                                <Bar dataKey="value" fill="#4f46e5" />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Ratios List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {chartData.map((r) => {
                    // find key from ratioDescriptions by matching title (fallback)
                    const key = Object.keys(ratioDescriptions).find(k => ratioDescriptions[k].title === r.name) ?? null;
                    const desc = key ? ratioDescriptions[key] : { title: r.name, description: '' };

                    return (
                        <div key={r.name} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow transition hover:shadow-2xl">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-gray-700">{desc.title ?? r.name}</h3>
                                <span className="text-xs text-gray-500">{formatValue(r.value)}</span>
                            </div>
                            <p className="text-sm text-gray-600">{desc.description}</p>
                            {desc.formula && <p className="text-xs text-gray-400 mt-3">Formula: <span className="font-mono">{desc.formula}</span></p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FinancialRatios;
