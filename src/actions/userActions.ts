import React from "react";
import { invokeRestApi } from "../api/axiosHelper";
import {
	ActionType,
	CLEAR_INPUT_ERROR,
	DISABLE_USER_INPUT_BUTTON,
	ONLINE_SWITCH_SUCCESSFULL,
	PRICE_UPDATE_SUCCESSFUL,
	RESTAURANT_UPDATE_SUCCESSFUL,
	UPDATE_FAILURE,
	USER_LOADING,
	USER_LOGIN_FAILURE,
	USER_LOGIN_SUCCESSFULL,
	USER_LOGOUT_FAILURE,
	USER_LOGOUT_SUCCESSFUL,
	USER_REGISTRATION_FAILURE,
} from "./constants/actionTypes";
import { UserType } from "../reducers/userReducer";
import { PRICE_EDIT_BOX_ID } from "../constants/constants";

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
		type: DISABLE_USER_INPUT_BUTTON
	} as ActionType);
	
	if (!restaurantName) {
		dispatch({
			type: UPDATE_FAILURE,
			payload: {message: "Input is not valid"},
		});
		return;
	}
	updateUser(dispatch, {restaurantName} as UserType, RESTAURANT_UPDATE_SUCCESSFUL, UPDATE_FAILURE);
}

export function dismissToast(dispatch: React.Dispatch<ActionType>) {
	dispatch({ type: CLEAR_INPUT_ERROR, payload: "" });
}

export function updateOnline(dispatch: React.Dispatch<ActionType>, online: boolean){
	
	dispatch({
		type: DISABLE_USER_INPUT_BUTTON
	} as ActionType);
	
	updateUser(dispatch, {online} as UserType, ONLINE_SWITCH_SUCCESSFULL, UPDATE_FAILURE);
}

export function udpatePrice(dispatch: React.Dispatch<ActionType>, priceString: string){
	const price = Number(priceString);
	
	dispatch({
		type: DISABLE_USER_INPUT_BUTTON
	} as ActionType);
	
	if(isNaN(price)){
		dispatch({
			type: UPDATE_FAILURE,
			payload: {message: "Input is not valid"},
		});
		return;
	}
	
	updateUser(dispatch, {price} as UserType, PRICE_UPDATE_SUCCESSFUL, UPDATE_FAILURE)
		.then(() => (document.getElementById(PRICE_EDIT_BOX_ID) as HTMLInputElement).value = '');
}

function updateUser(dispatch: React.Dispatch<ActionType>, user: UserType, successAction: string, failureAction: string){
	return invokeRestApi(
		"put",
		successAction,
		failureAction,
		"/admin/updateUser",
		null,
		user,
		dispatch
	)
}