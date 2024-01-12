import React from "react";
import { invokeRestApi } from "../api/axiosHelper";
import {
	ActionType,
	CLEAR_RESTAURANT_NAME_INPUT_ERROR,
	DISABLE_INPUT_BUTTON,
	RESTAURANT_UPDATE_FAILURE,
	RESTAURANT_UPDATE_SUCCESSFUL,
	USER_LOADING,
	USER_LOGIN_FAILURE,
	USER_LOGIN_SUCCESSFULL,
	USER_LOGOUT_FAILURE,
	USER_LOGOUT_SUCCESSFUL,
	USER_REGISTRATION_FAILURE,
} from "./constants/actionTypes";

export function registerUser(
	dispatch: React.Dispatch<ActionType>,
	params: object,
) {
	setUserLoading(dispatch);
	return invokeRestApi(
		"get",
		"",
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

export function setRestaurantName(
	dispatch: React.Dispatch<ActionType>,
	restaurantName: string | null | undefined,
) {
	dispatch({
		type: DISABLE_INPUT_BUTTON
	} as ActionType);
	
	if (!restaurantName) {
		dispatch({
			type: RESTAURANT_UPDATE_FAILURE,
			payload: "Input is not valid",
		});
		return;
	}

	invokeRestApi(
		"put",
		"",
		"",
		"/admin/updateRestaurant",
		{ restaurantName },
		null,
		dispatch,
	)
		.then(() =>
			dispatch({
				type: RESTAURANT_UPDATE_SUCCESSFUL,
				payload: restaurantName,
			}),
		)
		.catch((val) =>
			dispatch({ type: RESTAURANT_UPDATE_FAILURE, payload: val.message }),
		);
}

export function dismissToast(dispatch: React.Dispatch<ActionType>) {
	dispatch({ type: CLEAR_RESTAURANT_NAME_INPUT_ERROR, payload: "" });
}
