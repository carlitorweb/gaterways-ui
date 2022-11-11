import { ServerIcon, AtSymbolIcon } from '@heroicons/react/24/solid';
import { gaterways } from '../../type';

type Props = {
    gaterway: gaterways;
};

export default function ListData(props: Props) {
    return (
        <div className='min-w-0 space-y-3'>
            <div className='flex items-center space-x-3'>
                <span
                    className='bg-green-100 h-4 w-4 rounded-full flex items-center justify-center'
                    aria-hidden='true'>
                    <span className='bg-green-400 h-2 w-2 rounded-full' />
                </span>

                <h2 className='text-sm font-medium'>
                    {props.gaterway.name}{' '}
                    <span className='sr-only'>{true ? 'Running' : 'Not running'}</span>
                </h2>
            </div>
            <div className='group relative flex items-center space-x-2.5'>
                <ServerIcon
                    className='h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                />

                <span className='truncate text-sm font-medium text-gray-500 group-hover:text-gray-900'>
                    {props.gaterway.ipv4}
                </span>
            </div>
            <div className='group relative flex items-center space-x-2.5'>
                <AtSymbolIcon
                    className='h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                />

                <span className='truncate text-sm font-medium text-gray-500 group-hover:text-gray-900'>
                    {props.gaterway.sn}
                </span>
            </div>
        </div>
    );
}
