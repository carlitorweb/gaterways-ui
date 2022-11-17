import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect } from 'react';
import {
    GaterwayStoreContext,
    GaterwayStoreDispatchContext,
} from '../../context/gaterwayStore';
import ListActions from './list/action';
import ListData from './list/data';
import SortOptionsMenu from './list/sort';
import {
    actions,
    DialogDataType,
    fetchDeleteGaterwayMessage,
    fetchGetAllGaterwaysData,
} from '../../appTypes';
import DialogModalContext from '../../context/DialogModal';

/**
 * Top-level variable to track if some logic must run once per app load
 * rather than once per component mount
 *
 * @link https://beta.reactjs.org/learn/you-might-not-need-an-effect#initializing-the-application
 * @todo Move this variable to a more top file like App.tsx
 * for avoid the need of create it again in other component who may need it
 */
let didInit = false;

/**
 * @description Component for render and do some actions with the list of gaterways stored.
 *
 * @actions
 * Fetch the gaterways stored and render the list of gaterways in the first load of the page.
 *
 * Render the component again when a gaterway is removed updating the list of gaterways.
 */
function GaterwaysList() {
    // Gaterway store Context/Provider
    const gaterwaysDispatch = useContext(GaterwayStoreDispatchContext);
    const gaterways = useContext(GaterwayStoreContext);

    // Dialog provider context
    const dialogModalContext = useContext(DialogModalContext);

    /**
     * @description Get the list of gaterways when component mount the first time.
     *
     * @returns void
     *
     * @todo Catch the error exceptions of Fetch()
     * @todo DRY Another component use the exact logic for the Fetch
     */

    useEffect(() => {
        if (!didInit) {
            didInit = true;

            (async () => {
                const response = await fetch('http://127.0.0.1:8000/gaterways');
                const fetchedData = (await response.json()) as fetchGetAllGaterwaysData;

                // Add the new gaterways to the context-store state
                gaterwaysDispatch &&
                    gaterwaysDispatch({ type: actions.ADD_NEW_LIST_GATERWAYS, fetchedData });
            })();
        }
    }, []);

    /**
     * @description Remove a stored gaterway and re-render the component
     * for refresh the list of gaterways. Have in mind, delete a gaterway will
     * disconnect all his devices, so these devices will still exist but not connected
     * to a gaterway... I need later list all these devices, so from the UI the user
     * can connect the device to another gaterway.
     *
     * @param gaterwayId The ID of the gaterway we will remove
     *
     * @returns void
     *
     */
    const handlerGaterwayDelete = (gaterwayId: string) => {
        const userNotification: DialogDataType = {
            title: 'Attempt to remove a Gaterway',
            description: '',
            isError: false,
        };

        fetch(`http://127.0.0.1:8000/gaterways/${gaterwayId}`, {
            method: 'DELETE',
        })
            // Check if the server could add the new gaterway to the DB
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            // Server OK, now we can remove the Gaterway from our Context Store
            .then((gaterwayDeletedMessage: fetchDeleteGaterwayMessage) => {
                userNotification.description = gaterwayDeletedMessage.message;

                // Delete the gaterway from the context-store state
                gaterwaysDispatch &&
                    gaterwaysDispatch({
                        type: actions.REMOVE_GATERWAY,
                        gaterwayId,
                        gaterwayDeletedMessage,
                    });
            })
            .catch((error: Response) => {
                userNotification.isError = true;
                if (error.status == 404) {
                    userNotification.description =
                        'Failed to load the gaterway: the gaterway you try to delete was not found in the server (Error 404 - Not Found)';
                }
                console.log(error);
            })
            .finally(() => {
                // Trigger the Dialog modal to inform the user about a error or a succesful operation
                dialogModalContext.setDialogData(userNotification);
                dialogModalContext.setShowDialog(true);
            });
    };

    return (
        <div className='bg-white lg:min-w-0 lg:flex-1'>
            <div className='border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6'>
                <div className='flex items-center'>
                    <h1 className='flex-1 text-lg font-medium'>Gaterways</h1>
                    <SortOptionsMenu />
                </div>
            </div>
            <ul role='list' className='divide-y divide-gray-200 border-b border-gray-200'>
                {Array.isArray(gaterways.data) &&
                    gaterways.data.length > 0 &&
                    gaterways.data.map(gaterway => (
                        <li
                            key={gaterway.id}
                            className='relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6'>
                            <div className='flex items-center justify-between space-x-4'>
                                {/* Gaterway name, IPv4, SN */}
                                <ListData gaterway={gaterway} />

                                <ChevronRightIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />

                                {/* Gaterways options */}
                                <ListActions
                                    gaterway={gaterway}
                                    deleteHandler={handlerGaterwayDelete}
                                />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default GaterwaysList;
