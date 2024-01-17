import React from "react";
import {
	ActionType, CLEAR_SEARCH_ERROR, DISABLE_SEARCH_BUTTON, SEARCH_FAILURE, SEARCH_SUCCESSFULL
} from "./constants/actionTypes";
import { invokeRestApi } from "../api/axiosHelper";


export function dismissToast(dispatch: React.Dispatch<ActionType>) {
	dispatch({ type: CLEAR_SEARCH_ERROR} as ActionType);
}

export function search(search: string, page: number, username: string, dispatch: React.Dispatch<ActionType>){

	dispatch({type: DISABLE_SEARCH_BUTTON} as ActionType);

	invokeRestApi(
		"get",
		SEARCH_SUCCESSFULL,
		SEARCH_FAILURE,
		"/customer/search",
		{
			search,
			page,
			username
		},
		null,
		dispatch
	)

}