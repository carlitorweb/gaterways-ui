import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Slideover from '../../helpers/slideover';
import NotificationDialog from '../../helpers/dialog';

export default function SlideOverNewGaterway() {
    // Slideover close/open state
    const [slide, setSlide] = useState(false);
    // Gaterway form fields state
    const [form, setForm] = useState({
        name: '',
        sn: '',
        ipv4: '',
    });
    // NotificationDialog close/open state
    let [dialog, setDialog] = useState({
        open: false,
        title: '',
        description: '',
        text: '',
        isError: false,
        okButtonText: '',
    });

    const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const handleDialogContentChange = (state: any) => {
        setDialog({
            ...dialog,
            open: state.open,
            title: state.title,
            description: state.description,
            text: state.text,
            isError: state.isError,
            okButtonText: state.okButtonText,
        });
    };
    const handleDialogStatusChange = (status: boolean) => {
        setDialog({
            ...dialog,
            open: status,
        });
    };

    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Prepare the toast notification content
        let toastNotification: any = {
            open: true,
            title: 'Attempt to create a Gaterway',
            description: '',
            text: '',
            isError: false,
            okButtonText: '',
        };

        // Create a new gaterway
        const url = 'http://127.0.0.1:8000/gaterways';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async response => {
                const isJson = response.headers
                    .get('content-type')
                    ?.includes('application/json');
                const data = isJson ? await response.json() : null;

                toastNotification.description = data.message;

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                toastNotification.isError = false;
                handleDialogContentChange(toastNotification);
            })
            .catch(error => {
                toastNotification.isError = true;
                handleDialogContentChange(toastNotification);
                console.error('There was an error!', error);
            });
    };

    return (
        <>
            <button
                type='button'
                onClick={() => {
                    setSlide(true);
                }}
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:w-full'>
                New Gaterway
            </button>
            <Slideover showSlide={slide} toggleSlide={setSlide}>
                <form
                    onSubmit={handlerSubmit}
                    className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'>
                    <div className='h-0 flex-1 overflow-y-auto'>
                        <div className='bg-indigo-700 py-6 px-4 sm:px-6'>
                            <div className='flex items-center justify-between'>
                                <Dialog.Title className='text-lg font-medium text-white'>
                                    New Gaterway
                                </Dialog.Title>
                                <div className='ml-3 flex h-7 items-center'>
                                    <button
                                        type='button'
                                        className='rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                                        onClick={() => setSlide(false)}>
                                        <span className='sr-only'>Close panel</span>
                                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                    </button>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <p className='text-sm text-indigo-300'>
                                    Get started by filling in the information below to create a
                                    new Gaterway.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                <div className='space-y-6 pt-6 pb-5'>
                                    <div>
                                        <label
                                            htmlFor='name'
                                            className='block text-sm font-medium text-gray-900'>
                                            Gaterway name
                                        </label>
                                        <div className='mt-1'>
                                            <input
                                                type='text'
                                                name='name'
                                                id='name'
                                                value={form.name}
                                                onChange={handleFormInputChange}
                                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='sn'
                                            className='block text-sm font-medium text-gray-900'>
                                            Gaterway serial number
                                        </label>
                                        <div className='mt-1'>
                                            <input
                                                type='text'
                                                name='sn'
                                                id='sn'
                                                value={form.sn}
                                                onChange={handleFormInputChange}
                                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='ipv4'
                                            className='block text-sm font-medium text-gray-900'>
                                            Gaterway IPv4
                                        </label>
                                        <div className='mt-1'>
                                            <input
                                                type='text'
                                                name='ipv4'
                                                id='ipv4'
                                                value={form.ipv4}
                                                onChange={handleFormInputChange}
                                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-shrink-0 justify-end px-4 py-4'>
                        <button
                            type='button'
                            className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            onClick={() => setSlide(false)}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                            Save
                        </button>
                    </div>
                </form>
            </Slideover>

            {dialog.open && (
                <NotificationDialog
                    open={dialog.open}
                    title={dialog.title}
                    description={dialog.description}
                    isError={dialog.isError}
                    okButtonText={dialog.okButtonText}
                />
            )}
        </>
    );
}
