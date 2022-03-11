import { createContext, useEffect, useReducer } from "react";
import Reducer from "./AuthReducer.js"

const INITIAL_STATE = {
    token: JSON.parse(sessionStorage.getItem("token")) || null,
    isFetching: false,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        sessionStorage.setItem("token", JSON.stringify(state.token));
    }, [state.token]);

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );

}