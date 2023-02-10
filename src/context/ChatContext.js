import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext)

    const initialState = {
        chatID: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatID: currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid 
                 }
            case "LOGOUT_USER": // i added this because i need reset the ChatContext. need to set it back to initial state
                return {
                    user: action.payload,
                    chatID: "null"
                }
            default:
                return state
        }
    }
    

    const [state, dispatch] = useReducer(chatReducer, initialState)

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            { children }
        </ChatContext.Provider>
    )
}
