import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, ReferenceLine
} from 'recharts';
import { ArrowLeft } from 'lucide-react';
import useCalculationsStore from '../../store/calculationsStore';
import { ratioDescriptions, ratioOverview } from './ratioDescriptions';

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

    const chartData = useMemo(() => {
        const catData: { name: string; value: number | null }[] = [];
        const add = (key: string, value: number | null) =>
            catData.push({ name: ratioDescriptions[key]?.title ?? key, value });

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
        }

        return catData;
    }, [category, ratios]);

    const formatValue = (val: number | null) => {
        if (val === null || val === undefined) return '—';
        return val.toFixed(2);
    };

    const getBenchmarkValue = () => {
        const benchmarks: Record<string, number> = {
            grossProfitMargin: 40, operatingProfitMargin: 15, netProfitMargin: 10,
            roa: 8, roe: 15, roce: 12, roi: 10,
            debtToEquity: 2, debtRatio: 0.5, interestCoverage: 3, equityRatio: 0.5,
            currentRatio: 2, quickRatio: 1, cashRatio: 0.5
        };

        const validRatios = chartData.filter(r => r.value !== null);
        if (!validRatios.length) return null;

        const highestValue = validRatios.reduce((max, curr) =>
            Math.abs(curr.value!) > Math.abs(max.value!) ? curr : max
        );

        const foundKey = Object.keys(ratioDescriptions).find(
            k => ratioDescriptions[k].title === highestValue.name
        );

        return foundKey ? benchmarks[foundKey] ?? null : null;
    };

    const benchmarkValue = getBenchmarkValue();

    return (
        <div className="space-y-10">
            {/* --- HEADER SECTION --- */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    {/* Left Controls */}
                    <div className="flex items-center gap-4 flex-wrap">

                        <Link
                            to="/financial-health"
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500"
                        >
                            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Right Description */}
                    <div className="lg:text-right">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                            {CATEGORY_LABELS[category]}
                        </h1>
                        <p className="mt-3 text-sm text-gray-600 max-w-xl leading-relaxed">
                            {ratioOverview[category].description}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CHART CARD --- */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Ratio Performance
                    </h2>

                    {benchmarkValue !== null && (
                        <span className="text-sm text-gray-500">
                            Benchmark: {benchmarkValue.toFixed(1)}
                        </span>
                    )}
                </div>

                <div className="h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData.map(d => ({ name: d.name, value: d.value ?? 0 }))}
                            margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                interval={0}
                                angle={-35}
                                textAnchor="end"
                                height={70}
                                tick={{ fontSize: 11 }}
                            />
                            <YAxis tickFormatter={(v) => formatValue(v)} />
                            <Tooltip formatter={(v) => formatValue(v as number)} />
                            <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                            {benchmarkValue !== null && (
                                <ReferenceLine
                                    y={benchmarkValue}
                                    stroke="#10b981"
                                    strokeDasharray="3 3"
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* --- RATIO CARDS --- */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {chartData.map((ratio) => {
                    const key = Object.keys(ratioDescriptions).find(
                        k => ratioDescriptions[k].title === ratio.name
                    );

                    const desc = key ? ratioDescriptions[key] : { title: ratio.name, description: '' };

                    return (
                        <div
                            key={ratio.name}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-md font-semibold text-gray-900">{desc.title}</h3>
                                <span className="text-lg font-mono font-semibold text-gray-900">
                                    {formatValue(ratio.value)}
                                </span>
                            </div>

                            <p className="text-md text-gray-600 leading-relaxed">
                                {desc.description}
                            </p>

                            {desc.formula && (
                                <div className="mt-4 text-md bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700">
                                    <span className="font-medium">Formula:</span>{' '}
                                    <span className="font-mono">{desc.formula}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FinancialRatios;
