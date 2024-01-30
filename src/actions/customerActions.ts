import React from "react";
import { invokeRestApi } from "../api/axiosHelper";
import {
	ActionType,
	CUSTOMER_DATA_LOAD_FAILURE,
	CUSTOMER_DATA_LOAD_SUCCESSFULL,
	LOADING,
	PAYMENT_REQUEST_FAILURE,
	PAYMENT_REQUEST_LOADING,
	PAYMENT_REQUEST_SUCCESS,
	SET_USER_RESTAURANT
} from "./constants/actionTypes";
import { TrackType } from "../components/dashboard/Home";

export function loadCustomerData(
	dispatch: React.Dispatch<ActionType>,
	username: string,
	userDispatch: React.Dispatch<ActionType>,
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
			val.restaurantName &&
			userDispatch({
				type: SET_USER_RESTAURANT,
				payload: val.restaurantName,
			}),
	);
}

export function pay(track: TrackType, username: string | null, dispatch: React.Dispatch<ActionType>){
    dispatch({type: PAYMENT_REQUEST_LOADING} as ActionType);
    invokeRestApi(
        "post",
        PAYMENT_REQUEST_SUCCESS,
        PAYMENT_REQUEST_FAILURE,
        "customer/createTransaction",
        {	trackUri: track.uri,
			trackId: track.id,
			trackLength: track.length,
			customerName: "hello",
			username
		},
        null,
        dispatch
    )
}