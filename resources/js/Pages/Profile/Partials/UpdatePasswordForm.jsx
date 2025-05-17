import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function UpdatePasswordForm({ className = '' }) {
    const { t } = useTranslation();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                }
                if (errors.current_password) {
                    reset('current_password');
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-foreground/80">
                    {t('profile.password.title')}
                </h2>

                <p className="mt-1 text-sm text-foreground/60">
                    {t('profile.password.description')}
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value={t('profile.password.current')}
                        className="text-foreground/80"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password ? t('validation.password.current') : ''}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value={t('profile.password.new')}
                        className="text-foreground/80"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="new-password"
                    />

                    <InputError 
                        message={errors.password ? t('validation.password.required') : ''} 
                        className="mt-2" 
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={t('profile.password.confirm')}
                        className="text-foreground/80"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation ? t('validation.password.confirmed') : ''}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton 
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500"
                        disabled={processing}
                    >
                        {t('common.save')}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-foreground/60">
                            {t('common.saved')}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
