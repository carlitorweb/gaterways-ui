import React, { ReactNode } from 'react';

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

export type listGaterways = (gaterways & { devices: devices[] })[];

export type fetchGetAllGaterwaysData = {
    message: string;
    totalOfGaterways: number;
    data: listGaterways | [];
};

// Gaterway Store context reducer
export enum actions {
    ADD_NEW_LIST_GATERWAYS = 'ADD_NEW_LIST_GATERWAYS',
}
export interface GaterwayDispatchAction {
    type: actions;
    fetchedData: fetchGetAllGaterwaysData;
}
