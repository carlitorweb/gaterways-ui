import { createContext } from 'react';

const Context = createContext({ amount: 0, setAmount: (value: number) => {} });

export default Context;
