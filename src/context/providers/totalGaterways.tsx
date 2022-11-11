import { ReactNode, useState } from 'react';
import TotalGaterwaysContext from '../totalGaterways';

interface Props {
    children: ReactNode;
}

/**
 * @description A context for update in the leftSidebar component the total amount
 * of gaterways each time a action like add a gaterway or delete a gaterway etc happen
 *
 * @param children ReactNode
 */
export const TotalGaterwaysProvider = ({ children }: Props) => {
    const [amount, setAmount] = useState(0);

    return (
        <TotalGaterwaysContext.Provider value={{ amount, setAmount }}>
            {children}
        </TotalGaterwaysContext.Provider>
    );
};
