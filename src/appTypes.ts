import { ReactNode } from 'react';

export interface childrenProps {
    children: ReactNode;
}

export interface gaterways {
    id: string;
    name: string;
    sn: string;
    ipv4: string;
}
export interface devices {
    id: string;
    gaterwayId: string;
    vendor: string;
    createdAt: string;
    status: boolean;
}

// Gaterway Store context reducer
enum actions {
    ADD_NEW = 'ADD_NEW',
}
export interface Action {
    type: actions;
}

// Gaterway Store context initial data
export type inititalStateGaterwayStore = (gaterways & { devices: devices[] })[] | [];
export interface contextType {
    state: inititalStateGaterwayStore;
    dispatch: React.Dispatch<Action>;
}
