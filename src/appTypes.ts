/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

export type listGaterways = (gaterways & { devices: devices[] })[];

export type fetchGetAllGaterwaysData = {
    message: string;
    totalOfGaterways: number;
    data: listGaterways | [];
};

// Gaterway Store context reducer
export enum actions {
    ADD_NEW_LIST_GATERWAYS = 'ADD_NEW_LIST_GATERWAYS',
    REMOVE_GATERWAY = 'REMOVE_GATERWAY',
}
export interface GaterwayDispatchAction {
    type: actions;
    fetchedData?: fetchGetAllGaterwaysData;
    gaterwayId?: string;
    gaterwayDeletedMessage?: fetchDeleteGaterwayMessage;
}

// Message we got when try to delete a gaterway
export type fetchDeleteGaterwayMessage = {
    message: string;
};

// Dialog modal notification
export type DialogDataType = {
    isError: boolean;
    title: string;
    description: string;
};
export type DialogProviderDataType = {
    showDialog: boolean;
    setShowDialog: (value: boolean) => void;
    dialogData: DialogDataType;
    setDialogData: (data: DialogDataType) => void;
};
export const inititalDialogData: DialogProviderDataType = {
    showDialog: false,
    setShowDialog: (value: boolean) => {},
    dialogData: {
        isError: false,
        title: '',
        description: '',
    },
    setDialogData: (data: DialogDataType) => {},
};
export type DialogComponentDataType = {
    open: boolean;
    title: string;
    description: string;
    isError: boolean;
    closeDialog: (value: boolean) => void;
};
