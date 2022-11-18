import { createContext, Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { childrenProps, fetchGetAllGaterwaysData, GaterwayDispatchAction } from '../appTypes';

// Initital value of the store
const initialState: fetchGetAllGaterwaysData = {
    message: '',
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
 * @param draft A clone (free to mutate) of the current (previous) state of our context
 * @param action The action and the data for update our current state or
 * to get a specific information from our context-store, like the total of gaterways stored
 * @returns A object
 */
function gaterwaysReducer(draft: fetchGetAllGaterwaysData, action: GaterwayDispatchAction) {
    switch (action.type) {
        case 'ADD_NEW_LIST_GATERWAYS':
            if (action.fetchedData) {
                return (draft = action.fetchedData);
            }
            break;

        case 'ADD_NEW_GATERWAY':
            if (action.newGaterwayCreated) {
                draft.data.push(action.newGaterwayCreated);
            }
            break;

        case 'REMOVE_GATERWAY':
            if (action.gaterwayId) {
                draft.data = draft.data.filter(gater => {
                    return gater.id !== action.gaterwayId;
                });
            }
            break;

        case 'ADD_NEW_DEVICE':
            if (action.newDeviceCreated !== undefined) {
                const index = draft.data.findIndex(
                    gaterway =>
                        action.newDeviceCreated &&
                        gaterway.id === action.newDeviceCreated.gaterwayId
                );
                draft.data[index].devices?.push(action.newDeviceCreated) ?? null;
            }
            break;

        default:
            return initialState;
    }
}

/**
 * Main component
 */
const GaterwayStoreProvider = ({ children }: childrenProps) => {
    const [gaterways, dispatch] = useImmerReducer(gaterwaysReducer, initialState);

    return (
        <GaterwayStoreContext.Provider value={gaterways}>
            <GaterwayStoreDispatchContext.Provider value={dispatch}>
                {children}
            </GaterwayStoreDispatchContext.Provider>
        </GaterwayStoreContext.Provider>
    );
};
export { GaterwayStoreContext, GaterwayStoreDispatchContext, GaterwayStoreProvider };
