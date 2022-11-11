import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Slideover from '../../helpers/slideover';
import RenderFormFields from './form/renderFormFields';
import { gaterwayFormData } from '../type';
import TotalGaterwaysContext from '../../context/totalGaterways';
import { DialogDataType } from '../../context/type';
import DialogModalContext from '../../context/DialogModal';

export default function SlideOverNewGaterway() {
    // Slideover close/open state
    const [slide, setSlide] = useState(false);
    // Gaterway form fields state
    const [form, setForm] = useState<gaterwayFormData>({
        name: '',
        sn: '',
        ipv4: '',
    });

    // Total of gaterways provided
    const totalGaterwaysContext = useContext(TotalGaterwaysContext);

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
     * @todo Catch the error exceptions of Fetch()
     */
    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        (async () => {
            let response = await fetch(`http://127.0.0.1:8000/gaterways`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedPostMessage: { message: string } = await response.json();

            /**
             * I need trigger a re-render to the gaterway list for
             * the last gaterway show up. Maybe I will need a new context.
             * Maybe something like a dispatch evetn logic can help me group
             * all similar scenarios I already have
             */

            // Update the total amount of gaterways in the leftSidebar component
            // totalGaterwaysContext.setAmount(clonedFetchedData.totalOfGaterways);

            return fetchedPostMessage;
        })().then(response => {
            /**
             * Add the content we will show to the user, and then show the dialog
             *
             * @todo Move this to a separate component, will save me some lines of codes
             * each time I need use it
             *  */
            const userNotification: DialogDataType = {
                title: 'Attempt to create a new Gaterway',
                description: response.message,
                isError: false,
            };
            dialogModalContext.setDialogData(userNotification);
            dialogModalContext.setShowDialog(true);

            console.log(dialogModalContext);
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
