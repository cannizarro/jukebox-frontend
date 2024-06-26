import { ReactNode, createContext, useReducer } from "react";
import userContextReducer, { UserType } from "../reducers/userReducer";
import { ActionType } from "../actions/constants/actionTypes";

export const UserContext = createContext<UserContextType>(
	{} as UserContextType,
);

export function UserContextProvider({ children }: PropsType) {
	const [user, dispatch] = useReducer(userContextReducer, {} as UserType);

	return (
		<UserContext.Provider value={{ user, dispatch }}>
			{children}
		</UserContext.Provider>
	);
}

type PropsType = {
	children: ReactNode;
};

export type UserContextType = {
	user: UserType;
	dispatch: React.Dispatch<ActionType>;
};
