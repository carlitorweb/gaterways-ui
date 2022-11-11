export type gaterways = {
    id: string;
    name: string;
    sn: string;
    ipv4: string;
};

export type devices = {
    id: string;
    gaterwayId: string;
    vendor: string;
    createdAt: string;
    status: boolean;
};

export type fetchGetAllGaterwaysData = {
    message: string;
    totalOfGaterways: number;
    data: (gaterways & { devices: devices[] })[];
};

export type fetchDeleteGaterwayMessage = {
    message: string;
};
