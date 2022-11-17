import { gaterwayFormData } from '../../../appTypes';

type Props = {
    fields: gaterwayFormData;
    handlerInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Predefined layout of Tailwindcss
 */
export default function RenderFormFields(props: Props) {
    return (
        <div className='flex flex-1 flex-col justify-between'>
            <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                <div className='space-y-6 pt-6 pb-5'>
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-900'>
                            Gaterway name
                        </label>
                        <div className='mt-1'>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                value={props.fields.name}
                                onChange={props.handlerInputChange}
                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='sn'
                            className='block text-sm font-medium text-gray-900'>
                            Gaterway serial number
                        </label>
                        <div className='mt-1'>
                            <input
                                type='text'
                                name='sn'
                                id='sn'
                                value={props.fields.sn}
                                onChange={props.handlerInputChange}
                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='ipv4'
                            className='block text-sm font-medium text-gray-900'>
                            Gaterway IPv4
                        </label>
                        <div className='mt-1'>
                            <input
                                type='text'
                                name='ipv4'
                                id='ipv4'
                                value={props.fields.ipv4}
                                onChange={props.handlerInputChange}
                                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
