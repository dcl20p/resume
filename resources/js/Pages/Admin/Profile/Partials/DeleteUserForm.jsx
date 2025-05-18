import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const { t } = useTranslation();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground/80">
                    {t('profile.delete.title')}
                </h2>

                <p className="mt-1 text-sm text-foreground/60">
                    {t('profile.delete.description')}
                </p>
            </header>

            <DangerButton 
                onClick={confirmUserDeletion}
                className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-red-500"
            >
                {t('profile.delete.button')}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-foreground/80">
                        {t('profile.delete.confirm_title')}
                    </h2>

                    <p className="mt-1 text-sm text-foreground/60">
                        {t('profile.delete.confirm_description')}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value={t('profile.delete.password')}
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4 h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 bg-background/50 backdrop-blur-sm"
                            placeholder={t('profile.delete.password')}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal} className="bg-background/50 backdrop-blur-sm rounded-full">
                            {t('common.cancel')}
                        </SecondaryButton>

                        <DangerButton
                            className="ml-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-red-500"
                            disabled={processing}
                        >
                            {t('profile.delete.confirm_button')}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
