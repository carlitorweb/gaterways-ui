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
    devices?: devices[];
}
export interface devices {
    id: string;
    gaterwayId: string;
    vendor: string;
    createdAt: string;
    status: boolean;
}

export type fetchGetAllGaterwaysData = {
    message: string;
    data: gaterways[];
};

// Gaterway Store context reducer
export enum actions {
    ADD_NEW_LIST_GATERWAYS = 'ADD_NEW_LIST_GATERWAYS',
    REMOVE_GATERWAY = 'REMOVE_GATERWAY',
    ADD_NEW_GATERWAY = 'ADD_NEW_GATERWAY',
    ADD_NEW_DEVICE = 'ADD_NEW_DEVICE',
}
export interface GaterwayDispatchAction {
    type: actions;
    fetchedData?: fetchGetAllGaterwaysData;
    gaterwayId?: string;
    newGaterwayCreated?: gaterways;
    newDeviceCreated?: devices;
}

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

// Form for add a new Gaterway
export type gaterwayFormData = {
    name: string;
    sn: string;
    ipv4: string;
};
