import { invokeRestApi } from "../api/axiosHelper";
import {
	ActionType,
	USER_LOADING,
	USER_LOGIN_FAILURE,
	USER_LOGIN_SUCCESSFULL,
	USER_LOGOUT_FAILURE,
	USER_LOGOUT_SUCCESSFUL,
	USER_REGISTRATION_FAILURE,
	USER_REGISTRATION_SUCCESSFULL,
} from "./constants/actionTypes";

export function registerUser(
	dispatch: React.Dispatch<ActionType>,
	params: object,
) {
	setUserLoading(dispatch);
	invokeRestApi(
		"get",
		USER_REGISTRATION_SUCCESSFULL,
		USER_REGISTRATION_FAILURE,
		"/public/registerUser",
		params,
		null,
		dispatch,
	);
}

export function loginUser(dispatch: React.Dispatch<ActionType>) {
	setUserLoading(dispatch);
	return invokeRestApi(
		"get",
		USER_LOGIN_SUCCESSFULL,
		USER_LOGIN_FAILURE,
		"/admin/user",
		null,
		null,
		dispatch,
	);
}

export function logoutUser(dispatch: React.Dispatch<ActionType>) {
	return invokeRestApi(
		"delete",
		USER_LOGOUT_SUCCESSFUL,
		USER_LOGOUT_FAILURE,
		"/admin/logout",
		null,
		null,
		dispatch,
	);
}

export function setUserLoading(dispatch: React.Dispatch<ActionType>) {
	dispatch({ type: USER_LOADING } as ActionType);
}
