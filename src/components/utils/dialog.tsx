import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { dialogParams } from '../body/type';

interface notification extends dialogParams {
    toggleDialog: (status: boolean) => void;
}

function NotificationDialog(props: notification) {
    return (
        <Transition appear show={props.open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => props.toggleDialog(false)}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'>
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <div className='sm:flex sm:items-start'>
                                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                        {props.isError ? (
                                            <ExclamationTriangleIcon
                                                className='h-6 w-6 text-red-600'
                                                aria-hidden='true'
                                            />
                                        ) : (
                                            <CheckIcon
                                                className='h-6 w-6 text-green-600'
                                                aria-hidden='true'
                                            />
                                        )}
                                    </div>
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <Dialog.Title
                                            as='h3'
                                            className='text-lg font-medium leading-6 text-gray-900'>
                                            {props.title}
                                        </Dialog.Title>
                                        <div className='mt-2'>
                                            <p className='text-sm text-gray-500'>
                                                {props.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4 sm:mt-4 sm:flex sm:flex-row-reverse'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                        onClick={() => props.toggleDialog(false)}>
                                        Got it, thanks!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default NotificationDialog;
