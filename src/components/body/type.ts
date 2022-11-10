export type gaterways = {
    id: string;
    name: string;
    sn: string;
    ipv4: string;
};

export type fetchGetAllGaterwaysData = {
    message: string;
    totalOfGaterways: number;
    data: gaterways[];
};

export type fetchDeleteGaterwayMessage = {
    message: string;
};
