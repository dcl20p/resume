import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword({ status }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.forgot_password.title')} />

            <div className="mb-4 text-sm text-foreground/80">
                {t('auth.forgot_password.description')}
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value={t('auth.forgot_password.email')} className="text-foreground/80" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end">
                    <PrimaryButton 
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500"
                        disabled={processing}
                    >
                        {t('auth.forgot_password.submit')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
