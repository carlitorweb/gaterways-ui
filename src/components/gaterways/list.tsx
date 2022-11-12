import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect, useState } from 'react';
import TotalGaterwaysContext from '../../context/totalGaterways';

import { fetchDeleteGaterwayMessage, fetchGetAllGaterwaysData } from '../type';
import ListActions from './list/action';
import ListData from './list/data';
import SortOptionsMenu from './list/sort';

/**
 * @description Component for render and do some actions with the list of gaterways stored.
 *
 * @actions
 * Fetch the gaterways stored and render the list of gaterways in the first load of the page.
 *
 * Render the component again when a gaterway is removed updating the list of gaterways.
 */
function GaterwaysList() {
    // A state for our Gaterway and Devices datas
    const [fetchedData, setFetchedData] = useState<fetchGetAllGaterwaysData>();

    // A state for pass it down to our components, for each time an action
    // like removing a device, editing a gaterway, adding a device, etc
    // is triggered, we can re-render our list of gaterways
    const [doRender, setDoRender] = useState(false);

    // Total of gaterways provided
    const totalGaterwaysContext = useContext(TotalGaterwaysContext);

    /**
     * @description Get the list of gaterways when component mount the first time
     *
     * @returns void
     *
     * @todo Catch the error exceptions of Fetch()
     * @todo DRY Another component use the exact logic for the Fetch
     */
    useEffect(() => {
        (async () => {
            let response = await fetch('http://127.0.0.1:8000/gaterways');
            let data = (await response.json()) as fetchGetAllGaterwaysData;
            setFetchedData(data);

            // Update the total amount of gaterways in the leftSidebar component
            totalGaterwaysContext.setAmount(data.totalOfGaterways);
        })();
    }, []);

    /**
     * @description Add a new device and re-render the list of gaterways for
     * refresh the remained amount of devices that specific gaterway have
     *
     * @returns void
     *
     * @todo Instead of re-render the whole list of components, re-render only the
     * gaterway <li> element involved
     * @todo Catch the error exceptions of Fetch()
     * @todo DRY Another component use the exact logic for the Fetch
     */
    useEffect(() => {
        if (doRender === true) {
            (async () => {
                let response = await fetch('http://127.0.0.1:8000/gaterways');
                let data = (await response.json()) as fetchGetAllGaterwaysData;
                setFetchedData(data);
            })();

            // We reset the state for next action
            setDoRender(false);
        }
    }, [doRender]);

    /**
     * @description Remove a stored gaterway and re-render the component
     * for refresh the list of gaterways. Have in mind, delete a gaterway will
     * disconnect all his devices, so this devices will still exist but not connected
     * to a gaterway... I need later list all these devices, so from the UI the user
     * can connect the device to another gaterway.
     *
     * @param gaterwayId The ID of the gaterway we will remove
     *
     * @returns void
     *
     * @todo Catch the error exceptions of Fetch()
     */
    const handlerGaterwayDelete = (gaterwayId: string) => {
        if (fetchedData !== undefined) {
            (async () => {
                let response = await fetch(`http://127.0.0.1:8000/gaterways/${gaterwayId}`, {
                    method: 'DELETE',
                });
                const fetchedDelateMessage =
                    (await response.json()) as fetchDeleteGaterwayMessage;

                // Update 'fetchedData' state in a inmutable way and re-render the component
                // for update the list of gaterways
                const clonedFetchedData = { ...fetchedData };
                const newData = clonedFetchedData.data.filter(gater => {
                    return gater.id !== gaterwayId;
                });
                clonedFetchedData.data = newData;
                clonedFetchedData.totalOfGaterways--;
                clonedFetchedData.message = fetchedDelateMessage.message;

                setFetchedData(clonedFetchedData);

                // Update the total amount of gaterways in the leftSidebar component
                totalGaterwaysContext.setAmount(clonedFetchedData.totalOfGaterways);
            })();
        }
    };

    return (
        <div className='bg-white lg:min-w-0 lg:flex-1'>
            <div className='border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6'>
                <div className='flex items-center'>
                    <h1 className='flex-1 text-lg font-medium'>Gaterways </h1>
                    <SortOptionsMenu />
                </div>
            </div>
            <ul role='list' className='divide-y divide-gray-200 border-b border-gray-200'>
                {fetchedData !== undefined &&
                    Array.isArray(fetchedData.data) &&
                    fetchedData.data.length > 0 &&
                    fetchedData.data.map(gaterway => (
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
                                    renderList={setDoRender}
                                />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default GaterwaysList;
