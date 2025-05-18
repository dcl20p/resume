import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from 'recharts';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import dayjs from 'dayjs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function Analytics({ auth, title }) {
    const { t } = useTranslation();
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('/api/analytics', {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                
                if (response.data.success) {
                    setAnalyticsData(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                console.error('Analytics error:', err);
                setError(err.response?.data?.message || 'Failed to fetch analytics data');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const calculateTotalVisits = () => {
        if (!analyticsData?.dailyStats) return 0;
        return analyticsData.dailyStats.reduce((sum, day) => sum + day.visitors, 0);
    };

    const calculateTodayVisits = () => {
        if (!analyticsData?.dailyStats) return 0;
        const today = dayjs().format('YYYY-MM-DD');
        return analyticsData.dailyStats
            .filter(day => dayjs(day.date).format('YYYY-MM-DD') === today)
            .reduce((sum, day) => sum + day.visitors, 0);
    };

    const calculateTotalPageViews = () => {
        if (!analyticsData?.dailyStats) return 0;
        return analyticsData.dailyStats.reduce((sum, day) => sum + day.pageViews, 0);
    };

    const formatDate = (date) => {
        return dayjs(date).format('DD/MM/YYYY HH:mm');
    };

    const renderOverviewCards = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.total_visits')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{calculateTotalVisits()}</div>
                </CardContent>
            </Card>
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.today_visits')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{calculateTodayVisits()}</div>
                </CardContent>
            </Card>
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.total_page_views')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{calculateTotalPageViews()}</div>
                </CardContent>
            </Card>
        </div>
    );

    const renderDailyStats = () => (
        <Card className="mb-6 border-0">
            <CardHeader>
                <CardTitle>{t('analytics.daily_stats')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData?.dailyStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(date) => formatDate(date)}
                            />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip 
                                labelFormatter={(date) => formatDate(date)}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border-tooltip))',
                                    borderRadius: '10px',
                                    color: 'var(--foreground)',
                                    padding: '10px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    margin: '10px',
                                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <Legend />
                            <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="visitors" 
                                stroke="#8884d8" 
                                name={t('analytics.visitors')} 
                            />
                            <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="pageViews" 
                                stroke="#82ca9d" 
                                name={t('analytics.page_views')} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );

    const renderPieCharts = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.user_types')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData?.userTypes}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, value }) => `${t(`analytics.${name}`)}: ${value}`}
                                >
                                    {analyticsData?.userTypes?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border-tooltip))',
                                        borderRadius: '10px',
                                        color: 'var(--foreground)',
                                        padding: '10px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        margin: '10px',
                                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                    }}
                                    itemStyle={{
                                        color: 'var(--foreground)',
                                        padding: '3px 0'
                                    }}
                                    labelStyle={{
                                        color: 'var(--foreground)',
                                        marginBottom: '5px'
                                    }}
                                    formatter={(value, name) => [value, t(`analytics.${name}`)]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.top_browsers')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData?.topBrowsers}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {analyticsData?.topBrowsers?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border-tooltip))',
                                        borderRadius: '10px',
                                        color: 'var(--foreground)',
                                        padding: '10px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        margin: '10px',
                                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                    }}
                                    itemStyle={{
                                        color: 'var(--foreground)',
                                        padding: '3px 0'
                                    }}
                                    labelStyle={{
                                        color: 'var(--foreground)',
                                        marginBottom: '5px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderBarCharts = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.top_pages')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData?.topPages}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border-tooltip))',
                                        borderRadius: '10px',
                                        color: 'var(--foreground)',
                                        padding: '10px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        margin: '10px',
                                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                    }}
                                    itemStyle={{
                                        padding: '3px 0'
                                    }}
                                    labelStyle={{
                                        color: 'var(--foreground)',
                                        marginBottom: '5px'
                                    }}
                                />
                                <Bar dataKey="value" fill="#8884d8" name={t('analytics.page_views')} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0">
                <CardHeader>
                    <CardTitle>{t('analytics.top_countries')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData?.topCountries}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border-tooltip))',
                                        borderRadius: '10px',
                                        color: 'var(--foreground)',
                                        padding: '10px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        margin: '10px',
                                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                    }}
                                    itemStyle={{
                                        padding: '3px 0'
                                    }}
                                    labelStyle={{
                                        color: 'var(--foreground)',
                                        marginBottom: '5px'
                                    }}/>
                                <Bar dataKey="value" fill="#82ca9d" name={t('analytics.visitors')} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Analytics" />

            <div className="min-h-screen bg-background">
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold">{t('analytics.title')}</h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {loading ? (
                        <div className="text-center">{t('common.loading')}</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <>
                            {renderOverviewCards()}
                            {renderDailyStats()}
                            {renderPieCharts()}
                            {renderBarCharts()}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 