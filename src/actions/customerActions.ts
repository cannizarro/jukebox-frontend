import React from "react";
import { invokeRestApi } from "../api/axiosHelper";
import {
	ActionType,
	CUSTOMER_DATA_LOAD_FAILURE,
	CUSTOMER_DATA_LOAD_SUCCESSFULL,
	LOADING,
	SET_USER_RESTAURANT,
} from "./constants/actionTypes";

export function loadCustomerData(
	dispatch: React.Dispatch<ActionType>,
	username: string,
	userDispatch: React.Dispatch<ActionType>,
	isRestaurantNameAvailable: boolean,
) {
	dispatch({ type: LOADING } as ActionType);
	invokeRestApi(
		"get",
		CUSTOMER_DATA_LOAD_SUCCESSFULL,
		CUSTOMER_DATA_LOAD_FAILURE,
		"/customer/state",
		{ username },
		null,
		dispatch,
	).then(
		(val) =>
			!isRestaurantNameAvailable &&
			val.restaurantName &&
			userDispatch({
				type: SET_USER_RESTAURANT,
				payload: val.restaurantName,
			}),
	);
}
