import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
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
    Cell
} from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics({ auth, stats }) {
    console.log('Dashboard user:', auth);
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="glass-card border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('dashboard.totalVisits')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('dashboard.todayVisits')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.todayVisits.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('dashboard.uniqueVisitors')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('dashboard.pageViews')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Analytics */}
                <Tabs defaultValue="pages" className="space-y-6">
                    <TabsList className="glass-card border-0 bg-background/50">
                        <TabsTrigger value="pages" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                            {t('dashboard.tabs.pages')}
                        </TabsTrigger>
                        <TabsTrigger value="countries" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                            {t('dashboard.tabs.countries')}
                        </TabsTrigger>
                        <TabsTrigger value="devices" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                            {t('dashboard.tabs.devices')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pages" className="space-y-6">
                        <Card className="glass-card border-0">
                            <CardHeader>
                                <CardTitle>{t('dashboard.tabs.pages')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={stats.topPages}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                                            <XAxis dataKey="page" className="text-sm" />
                                            <YAxis className="text-sm" />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '0.5rem',
                                                    padding: '0.5rem'
                                                }}
                                            />
                                            <Bar dataKey="views" fill="#0088FE" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="countries" className="space-y-6">
                        <Card className="glass-card border-0">
                            <CardHeader>
                                <CardTitle>{t('dashboard.tabs.countries')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stats.visitorsByCountry}
                                                dataKey="visitors"
                                                nameKey="country"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={150}
                                                label
                                            >
                                                {stats.visitorsByCountry.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '0.5rem',
                                                    padding: '0.5rem'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="devices" className="space-y-6">
                        <Card className="glass-card border-0">
                            <CardHeader>
                                <CardTitle>{t('dashboard.tabs.devices')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stats.visitorsByDevice}
                                                dataKey="visitors"
                                                nameKey="device"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={150}
                                                label
                                            >
                                                {stats.visitorsByDevice.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '0.5rem',
                                                    padding: '0.5rem'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
} 