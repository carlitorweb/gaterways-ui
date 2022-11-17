import { createContext, Dispatch, useReducer } from 'react';
import {
    childrenProps,
    fetchGetAllGaterwaysData,
    GaterwayDispatchAction,
    listGaterways,
} from '../appTypes';

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

/**
 * @description Reducer to manage the state
 *
 * @param gaterways Current (previous) state of our context
 * @param action The action and the data for update our current state or
 * to get a specific information from our context-store, like the total of gaterways stored
 * @returns A object
 */
function gaterwaysReducer(
    gaterways: fetchGetAllGaterwaysData,
    action: GaterwayDispatchAction
) {
    switch (action.type) {
        case 'ADD_NEW_LIST_GATERWAYS':
            if (action.fetchedData) {
                return {
                    ...gaterways,
                    data: action.fetchedData.data,
                    message: action.fetchedData.message,
                    totalOfGaterways: action.fetchedData.totalOfGaterways,
                };
            }

        case 'REMOVE_GATERWAY':
            return {
                ...gaterways,
                data: gaterways.data.filter(gater => {
                    return gater.id !== action.gaterwayId;
                }),
                message: action.gaterwayDeletedMessage!.message,
                totalOfGaterways: gaterways.totalOfGaterways--,
            };

        default:
            return initialState;
    }
}

/**
 * Main component
 */
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
