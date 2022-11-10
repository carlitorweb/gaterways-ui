import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { fetchDeleteGaterwayMessage, fetchGetAllGaterwaysData } from '../body/type';
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
    const [fetchedData, setFetchedData] = useState<fetchGetAllGaterwaysData>();

    /**
     * @description Get the list of gaterways when component mount the first time
     *
     * @returns void
     *
     * @todo Catch the error exceptions of Fetch()
     */
    useEffect(() => {
        (async () => {
            let response = await fetch('http://127.0.0.1:8000/gaterways');
            let data: fetchGetAllGaterwaysData = await response.json();
            setFetchedData(data);
        })();
    }, []);

    /**
     * @description Remove a stored gaterway and and re-render the component
     * for refresh the list of gaterways
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
                const fetchedDelateMessage: fetchDeleteGaterwayMessage = await response.json();

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
            })();
        }
    };

    return (
        <div className='bg-white lg:min-w-0 lg:flex-1'>
            <div className='border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6'>
                <div className='flex items-center'>
                    <h1 className='flex-1 text-lg font-medium'>
                        Gaterways{' '}
                        <span className='inline-flex bg-purple-100 text-purple-600 ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'>
                            {fetchedData !== undefined ? fetchedData.totalOfGaterways : 0}
                        </span>
                    </h1>
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
                                />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default GaterwaysList;
