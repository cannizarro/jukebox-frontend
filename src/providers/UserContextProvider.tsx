import { ReactNode, createContext, useEffect, useReducer } from "react";
import userContextReducer, { UserType } from "../reducers/userReducer";
import { ActionType } from "../actions/constants/actionTypes";
import { loginUser, registerUser } from "../actions/userActions";

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({ children }: PropsType){

    const [user, dispatch] = useReducer(userContextReducer, {} as UserType);

    useEffect(() => {
        loginUser(dispatch)
            .catch(() => {
                const params = new URLSearchParams(window.location.search);
                if(params.get("code") && params.get("state")){
                    registerUser(dispatch, params);
                    window.history.replaceState(window.history.state, "", "/");
                }
            });
    }, [dispatch, user.registered]);

    return (
        <UserContext.Provider value={{user, dispatch}}>
            {children}
        </UserContext.Provider>
    );

}

type PropsType = {
    children: ReactNode
}

export type UserContextType = {
    user: UserType,
    dispatch: React.Dispatch<ActionType>
}
