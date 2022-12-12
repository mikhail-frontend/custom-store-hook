import {useEffect, useState} from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const [, setState] = useState(globalState);
    listeners.push(setState);

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};

        for (const listener of listeners) {
            listener(globalState)
        }
    };

    useEffect(() => {
        if(!shouldListen) return;
        listeners.push(setState)
        return () => {
            listeners = listeners.filter(el => el !== setState);
        }
    }, []);

    return [globalState, dispatch]

}

export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions, ...userActions}
}
