import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function VerifyEmail({ status }) {
    const { t } = useTranslation();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 1000 * 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <GuestLayout>
            <Head title={t('auth.verify_email')} />

            <div className="mb-4 text-sm text-foreground/80">
                {t('auth.verify_email_text')}
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {t('auth.verification_link_sent')}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="flex items-center justify-between">
                    <PrimaryButton 
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500"
                        disabled={processing}
                    >
                        {t('auth.resend_verification')}
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-foreground/80 hover:text-foreground"
                    >
                        {t('auth.log_out')}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
