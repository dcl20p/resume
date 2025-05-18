import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value={t('auth.register.name')} className="text-foreground/80" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('auth.register.email')} className="text-foreground/80" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t('auth.register.password')} className="text-foreground/80" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value={t('auth.register.password_confirmation')} className="text-foreground/80" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="text-sm text-foreground/80 hover:text-foreground me-4"
                    >
                        {t('auth.register.have_account')}
                    </Link>

                    <PrimaryButton 
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500"
                        disabled={processing}
                    >
                        {t('auth.register.submit')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
