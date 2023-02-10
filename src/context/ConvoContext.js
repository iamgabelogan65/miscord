import { createContext, useReducer, useEffect } from "react";

export const ConvoContext = createContext()

export const ConvoContextProvider = ({ children }) => {

    let initialState = {
        convo: {}
    }

    const convoReducer = (state, action) => {
        switch(action.type) {
            case "SET_CONVO":
                return {
                    convo: action.payload
                 }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(convoReducer, initialState, () => {
        const localData = localStorage.getItem('convoID')
        return localData ? JSON.parse(localData) : initialState
    })

    useEffect(() => {
        localStorage.setItem('convoID', JSON.stringify(state))
    }, [state])

    return (
        <ConvoContext.Provider value={ {...state, dispatch} }>
            { children }
        </ConvoContext.Provider>
    )
}