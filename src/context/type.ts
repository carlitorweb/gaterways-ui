// For Dialog Context Provider
// ------------------------------------
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

export let inititalDialogData: DialogProviderDataType = {
    showDialog: false,
    setShowDialog: () => {},
    dialogData: {
        isError: false,
        title: '',
        description: '',
    },
    setDialogData: () => {},
};

export type DialogComponentDataType = {
    open: boolean;
    title: string;
    description: string;
    isError: boolean;
    closeDialog: (value: boolean) => void;
};
