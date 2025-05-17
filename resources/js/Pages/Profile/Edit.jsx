import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useTranslation } from 'react-i18next';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t('profile.title')} />

            <div className="min-h-screen bg-background">
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
                    </div>
                </div>
                
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>{t('profile.information.title')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>{t('profile.password.title')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <UpdatePasswordForm />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>{t('profile.delete.title')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DeleteUserForm />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
