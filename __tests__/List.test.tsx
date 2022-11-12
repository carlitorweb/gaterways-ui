// Test for components/gaterways/create
import { unmountComponentAtNode, render } from 'react-dom';
import List from '../src/components/gaterways/list';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

const oneDummyGaterway = [
    {
        id: '636e7a8dc5274ad8d33ea331',
        sn: '33rr22',
        name: 'carlitorweb',
        ipv4: '192.168.100.1',
        devices: [
            {
                id: '636e7afbc5274ad8d33ea332',
                gaterwayId: '636e7a8dc5274ad8d33ea331',
                vendor: 'sss',
                createdAt: '2022-11-11T16:40:27.825Z',
                status: false,
            },
            {
                id: '636e7bedc5274ad8d33ea333',
                gaterwayId: '636e7a8dc5274ad8d33ea331',
                vendor: 'ssspp',
                createdAt: '2022-11-11T16:44:29.748Z',
                status: true,
            },
            {
                id: '636e7c11c5274ad8d33ea334',
                gaterwayId: '636e7a8dc5274ad8d33ea331',
                vendor: 'sss',
                createdAt: '2022-11-11T16:45:05.929Z',
                status: true,
            },
        ],
    },
];
