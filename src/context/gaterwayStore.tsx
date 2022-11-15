import { childrenProps, inititalStateGaterwayStore, Action, contextType } from '@appTypes';
import { createContext, useReducer } from 'react';

// Create the store with empty data as initital value
const initialState: inititalStateGaterwayStore = [];
const GaterwayStoreContext = createContext<contextType>({
    state: initialState,
    dispatch: (action: Action) => {},
});

// Reducer to manage the state
function gaterwayStateReducer(stateToChange: inititalStateGaterwayStore, action: Action) {
    switch (action.type) {
        case 'ADD_NEW':
            return { ...initialState, ...stateToChange };

        default:
            return initialState;
    }
}

// Gaterway store provider
const GaterwayStoreProvider = ({ children }: childrenProps) => {
    const [state, dispatch] = useReducer(gaterwayStateReducer, initialState);

    return (
        <GaterwayStoreContext.Provider value={{ state, dispatch }}>
            {children}
        </GaterwayStoreContext.Provider>
    );
};
export { GaterwayStoreContext, GaterwayStoreProvider };
