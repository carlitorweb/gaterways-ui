import { useState, useEffect } from 'react';
import { gaterways } from '../body/type';

type fetchGetAllGaterways = {
    message: string;
    totalOfGaterways: number;
    data: gaterways[];
};

const useFetch = (url: string) => {
    const [data, setData] = useState<gaterways[] | null>(null);
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((fetchData: fetchGetAllGaterways) => setData(fetchData.data))
            .catch(err => console.log(err));
    }, [url]);
    return [data];
};
export default useFetch;
