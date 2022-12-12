import {useEffect, useState} from "react";

let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
    const [, setState] = useState(globalState);
    listeners.push(setState);

    useEffect(() => {
        listeners.push(setState)
        return () => {
            listeners = listeners.filter(el => el !== setState);
        }
    }, []);

}
export default useStore;