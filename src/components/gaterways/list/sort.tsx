import { Menu } from '@headlessui/react';
import { BarsArrowUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

/**
 *  Tailwindcss predefined component for a dropdown menu
 *
 * @todo Sort the gaterways list using the 'name' and 'sn' gaterway field
 * @todo Make it reusable by other components and move it to 'utils' folder.
 */

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function SortOptionsMenu() {
    return (
        <>
            <span className='inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 mr-2'>
                WIP
            </span>

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
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}>
                                    Date created
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </>
    );
}
