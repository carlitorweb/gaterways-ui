import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Slideover from '../../helpers/slideover';
import RenderFormFields from './form/renderFormFields';
import DialogModalContext from '../../context/DialogModal';
import { actions, DialogDataType, gaterwayFormData, gaterways } from '../../appTypes';
import { GaterwayStoreDispatchContext } from '../../context/gaterwayStore';

export default function SlideOverNewGaterway() {
    // Slideover close/open state
    const [slide, setSlide] = useState(false);
    // Gaterway form fields state
    const [form, setForm] = useState<gaterwayFormData>({
        name: '',
        sn: '',
        ipv4: '',
    });

    // Gaterway store Context/Provider
    const gaterwaysDispatch = useContext(GaterwayStoreDispatchContext);

    // Our Dialog provider context
    const dialogModalContext = useContext(DialogModalContext);

    /**
     * @description Update our Form state
     *
     * @param event A event from which we will get access to what the user wrote in the fields
     */
    const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    /**
     * @description Store the new gaterway created
     *
     * @param event The event from the submit button of the form
     *
     * @todo Let the user can add Devices in the Gaterway create form
     * and save all in the same operation
     */
    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userNotification: DialogDataType = {
            title: 'Attempt to create a new Gaterway',
            description: '',
            isError: false,
        };

        fetch(`http://127.0.0.1:8000/gaterways`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            // Check if the server could add the new gaterway to the DB
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            // Server OK, now we can add the new Gaterway to our Context Store
            .then(resp => {
                const newGaterwayCreated: gaterways = {
                    ...form,
                    id: resp.gaterwayCreatedId,
                };

                // Add the new gaterway to the context-store state
                gaterwaysDispatch &&
                    gaterwaysDispatch({
                        type: actions.ADD_NEW_GATERWAY,
                        newGaterwayCreated,
                    });

                // Prepare the notification message for the user
                userNotification.description = resp.message;
            })
            .catch(error => {
                userNotification.isError = true;
                userNotification.description = error.message;
                console.log(error);
            })
            .finally(() => {
                // Trigger the Dialog modal to inform the user about a error or a succesful operation
                dialogModalContext.setDialogData(userNotification);
                dialogModalContext.setShowDialog(true);
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
                        <RenderFormFields
                            fields={form}
                            handlerInputChange={handleFormInputChange}
                        />
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
        </>
    );
}
