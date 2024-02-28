import { invokeRestApi } from "../api/axiosHelper";
import { TransactionPageRequestType } from "../reducers/transactionReducer";
import { ActionType, TRANSACTION_ACTION_FAILURE, TRANSACTION_ACTION_SUCCESSFULL, TRANSACTION_LOADING } from "./constants/actionTypes";

export function getTransactions(requestBody: TransactionPageRequestType, dispatch: React.Dispatch<ActionType>){

	dispatch({
		type: TRANSACTION_LOADING
	} as ActionType);

	invokeRestApi(
		"get",
		TRANSACTION_ACTION_SUCCESSFULL,
		TRANSACTION_ACTION_FAILURE,
		"admin/transactions",
        requestBody,
        null,
        dispatch
	)
}