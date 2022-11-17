import { gaterways } from '../../../appTypes';
import AddDevice from '../devices/add';

type Props = {
    gaterway: gaterways;
    deleteHandler: (gaterwayId: string) => void;
};

export default function ListActions(props: Props) {
    return (
        <div className='flex-shrink-0 flex-col items-end space-y-3 sm:flex'>
            <div className='flex space-x-2 text-sm'>
                <button
                    type='button'
                    className='rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    Edit
                </button>
                <span className='text-gray-300' aria-hidden='true'>
                    |
                </span>
                <button
                    type='button'
                    onClick={() => props.deleteHandler(props.gaterway.id)}
                    className='rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    Remove
                </button>
                <span className='text-gray-300' aria-hidden='true'>
                    |
                </span>
                <AddDevice sn={props.gaterway.sn} id={props.gaterway.id} />
            </div>
        </div>
    );
}
