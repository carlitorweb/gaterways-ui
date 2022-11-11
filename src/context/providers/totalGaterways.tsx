import { ReactNode, useState } from 'react';
import TotalGaterwaysContext from '../context';

interface Props {
    children: ReactNode;
}

export const TotalGaterwaysProvider = ({ children }: Props) => {
    const [amount, setAmount] = useState(0);

    return (
        <TotalGaterwaysContext.Provider value={{ amount, setAmount }}>
            {children}
        </TotalGaterwaysContext.Provider>
    );
};
