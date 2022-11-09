import { Menu } from '@headlessui/react';
import { BarsArrowUpIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { ServerIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import MenuDropdown from '../utils/menuDropdown';
import useFetch from '../utils/useFetch';
import { gaterways } from './type';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function GaterwaysList() {
    const [listGaterways, setListGaterways] = useState<gaterways[] | null>();
    const [gaterways] = useFetch('http://127.0.0.1:8000/gaterways');

    return (
        <div className='bg-white lg:min-w-0 lg:flex-1'>
            <div className='border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6'>
                <div className='flex items-center'>
                    <h1 className='flex-1 text-lg font-medium'>Gaterways</h1>
                    <Menu as='div' className='relative'>
                        <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                            <BarsArrowUpIcon
                                className='mr-3 h-5 w-5 text-gray-400'
                                aria-hidden='true'
                            />
                            Sort
                            <ChevronDownIcon
                                className='ml-2.5 -mr-1.5 h-5 w-5 text-gray-400'
                                aria-hidden='true'
                            />
                        </Menu.Button>
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='py-1'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Name
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Date modified
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Date created
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
            <ul role='list' className='divide-y divide-gray-200 border-b border-gray-200'>
                {Array.isArray(gaterways) &&
                    gaterways.length > 0 &&
                    gaterways!.map(gaterway => (
                        <li
                            key={gaterway.id}
                            className='relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6'>
                            <div className='flex items-center justify-between space-x-4'>
                                {/* Repo name and link */}
                                <div className='min-w-0 space-y-3'>
                                    <div className='flex items-center space-x-3'>
                                        <span
                                            className={classNames(
                                                true ? 'bg-green-100' : 'bg-gray-100',
                                                'h-4 w-4 rounded-full flex items-center justify-center'
                                            )}
                                            aria-hidden='true'>
                                            <span
                                                className={classNames(
                                                    true ? 'bg-green-400' : 'bg-gray-400',
                                                    'h-2 w-2 rounded-full'
                                                )}
                                            />
                                        </span>

                                        <h2 className='text-sm font-medium'>
                                            <span
                                                className='absolute inset-0'
                                                aria-hidden='true'
                                            />
                                            {gaterway.name}{' '}
                                            <span className='sr-only'>
                                                {true ? 'Running' : 'Not running'}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className='group relative flex items-center space-x-2.5'>
                                        <ServerIcon
                                            className='h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                                            aria-hidden='true'
                                        />

                                        <span className='truncate text-sm font-medium text-gray-500 group-hover:text-gray-900'>
                                            {gaterway.ipv4}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRightIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />

                                {/* Repo meta info */}
                                <div className='hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex'>
                                    <p className='flex space-x-2 text-sm text-gray-500'>
                                        <span className='ml-4 flex flex-shrink-0 items-start space-x-4'>
                                            <button
                                                type='button'
                                                className='rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                                                Edit
                                            </button>
                                            <span className='text-gray-300' aria-hidden='true'>
                                                |
                                            </span>
                                            <button
                                                type='button'
                                                className='rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                                                Remove
                                            </button>
                                            <span className='text-gray-300' aria-hidden='true'>
                                                |
                                            </span>
                                            <button
                                                type='button'
                                                className='rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                                                Add devices
                                            </button>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default GaterwaysList;
