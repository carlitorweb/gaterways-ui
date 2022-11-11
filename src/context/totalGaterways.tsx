import { createContext } from 'react';

const TotalGaterwaysContext = createContext({ amount: 0, setAmount: (value: number) => {} });

export default TotalGaterwaysContext;
