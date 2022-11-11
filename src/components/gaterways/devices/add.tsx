import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useContext, useRef, useState } from 'react';
import DialogModalContext from '../../../context/DialogModal';
import { DialogDataType } from '../../../context/type';
import Slideover from '../../../helpers/slideover';
import Toggle from '../../../helpers/toggle';

interface Props {
    sn: string;
    id: string;
    renderList: (value: boolean) => void;
}

interface fetchAddedDevice {
    message: string;
}

/**
 * @description Component for render the Form for add a new device to the selected Gaterway
 *
 * @actions
 * Store the new Device
 *
 * Show a notification that the Device was store successfully or a error otherwise.
 *
 * Re-render the Gaterways list for show the changes
 *
 * @todo Move the Form component outside the AddDevice component, in this way
 * we load just one Form component, and we just need change the Gaterway SN and ID linked
 * with the new Device the user will create, each time we slide-open the panel.
 * Otherwise the current result is load a Form component for each Gaterway listed.
 *
 */
export default function AddDevice(props: Props) {
    // Open/Close state for the slide panel who have the Form for add a Device
    const [slide, setSlide] = useState(false);

    // Form fields state to add a new Device
    const [form, setForm] = useState({
        vendor: '',
    });

    const dialogModalContext = useContext(DialogModalContext);

    // Save the status of the toggle component
    const deviceStatus = useRef(false);

    // Save the data of the Form to later store it
    const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    // Store the new Device and re-render our gaterway list component
    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const deviceBody = {
            vendor: form.vendor,
            status: deviceStatus.current,
            gaterwayId: props.id,
        };

        (async () => {
            let response = await fetch(`http://127.0.0.1:8000/devices`, {
                method: 'POST',
                body: JSON.stringify(deviceBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const fetchedDelateMessage: fetchAddedDevice = await response.json();

            return fetchedDelateMessage;
        })().then(reponse => {
            // Show a notification to the user about the device was added succefully
            if (dialogModalContext.showDialog) {
                // Close any Dialog we could have opened
                dialogModalContext.setShowDialog(false);
            }

            // Add the content we will show to the user, and then show the dialog
            const userNotification: DialogDataType = {
                title: 'Attempt to create a new Peripheral device',
                description: reponse.message,
                isError: false,
            };
            dialogModalContext.setDialogData(userNotification);
            dialogModalContext.setShowDialog(true);

            console.log(dialogModalContext);

            // while user read our notification, let update the list of gaterways
            props.renderList(true);
        });
    };
    return (
        <>
            <button
                type='button'
                onClick={() => {
                    setSlide(true);
                }}
                className='rounded-md bg-white font-medium text-purple-600 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                Add devices
            </button>

            {/* Predefined Tailwindcss layout */}
            <Slideover showSlide={slide} toggleSlide={setSlide}>
                <form
                    onSubmit={handlerSubmit}
                    className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'>
                    <div className='h-0 flex-1 overflow-y-auto'>
                        <div className='bg-purple-700 py-6 px-4 sm:px-6'>
                            <div className='flex items-center justify-between'>
                                <Dialog.Title className='text-lg font-medium text-white'>
                                    {`Add a Device to Gaterway - ${props.sn}`}
                                </Dialog.Title>
                                <div className='ml-3 flex h-7 items-center'>
                                    <button
                                        type='button'
                                        className='rounded-md bg-purple-700 text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                                        onClick={() => setSlide(false)}>
                                        <span className='sr-only'>Close panel</span>
                                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                    </button>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <p className='text-sm text-purple-300'>
                                    Get started by filling in the information below to create a
                                    new Device.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                <div className='space-y-6 pt-6 pb-5'>
                                    <div>
                                        <label
                                            htmlFor='vendor'
                                            className='block text-sm font-medium text-gray-900'>
                                            Device vendor
                                        </label>
                                        <div className='mt-1'>
                                            <input
                                                type='text'
                                                name='vendor'
                                                id='vendor'
                                                value={form.vendor}
                                                onChange={handleFormInputChange}
                                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm'
                                            />
                                        </div>
                                    </div>

                                    <Toggle status={deviceStatus} />
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
                            className='ml-4 inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                            Save
                        </button>
                    </div>
                </form>
            </Slideover>
        </>
    );
}
