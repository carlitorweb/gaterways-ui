import { CheckBadgeIcon, RectangleStackIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';
import carlitorweb_avatar_src from '../../assets/carlitorweb.jpg';
import { GaterwayStoreContext } from '../../context/gaterwayStore';
import GaterwayForm from '../gaterways/create';

function LeftSidebar() {
    const gaterways = useContext(GaterwayStoreContext);

    return (
        <>
            <div className='bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200'>
                <div className='py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                    <div className='flex items-center justify-between'>
                        <div className='flex-1 space-y-8'>
                            <div className='space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8'>
                                {/* Profile */}
                                <div className='flex items-center space-x-3'>
                                    <div className='h-12 w-12 flex-shrink-0'>
                                        <img
                                            className='h-12 w-12 rounded-full'
                                            src={carlitorweb_avatar_src}
                                            alt='Carlos Rodriguez'
                                        />
                                    </div>
                                    <div className='space-y-1'>
                                        <div className='text-sm font-medium text-gray-900'>
                                            Carlos Rodriguez
                                        </div>
                                        <a
                                            href='https://github.com/carlitorweb'
                                            target='_blanck'
                                            className='group flex items-center space-x-2.5'>
                                            <svg
                                                className='h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                                aria-hidden='true'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'>
                                                <path
                                                    fillRule='evenodd'
                                                    d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                            <span className='text-sm font-medium text-gray-500 group-hover:text-gray-900'>
                                                carlitorweb
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                {/* Action buttons */}
                                <div className='flex flex-col sm:flex-row xl:flex-col'>
                                    <GaterwayForm />
                                </div>
                            </div>
                            {/* Meta info */}
                            <div className='flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6'>
                                <div className='flex items-center space-x-2'>
                                    <CheckBadgeIcon
                                        className='h-5 w-5 text-gray-400'
                                        aria-hidden='true'
                                    />
                                    <span className='text-sm font-medium text-gray-500'>
                                        Pro Member
                                    </span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RectangleStackIcon
                                        className='h-5 w-5 text-gray-400'
                                        aria-hidden='true'
                                    />

                                    <span className='text-sm font-medium text-gray-500'>
                                        {gaterways.data.length} Gaterways stored
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeftSidebar;
