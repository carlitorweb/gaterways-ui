import carlitorweb_avatar_src from '../../assets/carlitorweb.jpg';

const activityItems = [
    { project: 'Gaterway', gaterwaySN: '2d89f0c8', time: '1h' },
    // More items...
];

function RightSidebar() {
    return (
        <div className='bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0'>
            <div className='pl-6 lg:w-80'>
                <div className='pt-6 pb-2'>
                    <h2 className='text-sm font-semibold'>
                        Last Activity{' '}
                        <span className='inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800'>
                            WIP
                        </span>
                    </h2>
                </div>
                <div>
                    <ul role='list' className='divide-y divide-gray-200'>
                        {activityItems.map(item => (
                            <li key={item.gaterwaySN} className='py-4'>
                                <div className='flex space-x-3'>
                                    <img
                                        className='h-6 w-6 rounded-full'
                                        src={carlitorweb_avatar_src}
                                        alt='Carlos Rodriguez'
                                    />
                                    <div className='flex-1 space-y-1'>
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-sm font-medium'>
                                                Carlos Rodriguez
                                            </h3>
                                            <p className='text-sm text-gray-500'>
                                                {item.time}
                                            </p>
                                        </div>
                                        <p className='text-sm text-gray-500'>
                                            Deployed a {item.project} with SN (
                                            {item.gaterwaySN})
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='border-t border-gray-200 py-4 text-sm'>
                        <a
                            href='#'
                            className='font-semibold text-indigo-600 hover:text-indigo-900'>
                            View all activity
                            <span aria-hidden='true'> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
