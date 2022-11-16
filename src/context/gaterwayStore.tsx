import { createContext, Dispatch, useReducer } from 'react';
import { childrenProps, fetchGetAllGaterwaysData, GaterwayDispatchAction } from '../appTypes';
// Initital value of the store
const initialState: fetchGetAllGaterwaysData = {
    message: '',
    totalOfGaterways: 0,
    data: [],
};

// Gaterway store context/provider
const GaterwayStoreContext = createContext(initialState);
const GaterwayStoreDispatchContext = createContext<Dispatch<GaterwayDispatchAction> | null>(
    null
);

// Reducer to manage the state
function gaterwaysReducer(
    gaterways: fetchGetAllGaterwaysData,
    action: GaterwayDispatchAction
) {
    switch (action.type) {
        case 'ADD_NEW':
            return {
                ...gaterways,
                data: action.fetchedData.data,
                message: action.fetchedData.message,
                totalOfGaterways: action.fetchedData.totalOfGaterways,
            };

        default:
            return initialState;
    }
}

const GaterwayStoreProvider = ({ children }: childrenProps) => {
    const [gaterways, dispatch] = useReducer(gaterwaysReducer, initialState);

    return (
        <GaterwayStoreContext.Provider value={gaterways}>
            <GaterwayStoreDispatchContext.Provider value={dispatch}>
                {children}
            </GaterwayStoreDispatchContext.Provider>
        </GaterwayStoreContext.Provider>
    );
};
export { GaterwayStoreContext, GaterwayStoreDispatchContext, GaterwayStoreProvider };
