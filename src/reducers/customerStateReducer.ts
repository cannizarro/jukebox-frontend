import {
	ActionType,
	CUSTOMER_DATA_LOAD_FAILURE as CUSTOMER_STATE_LOAD_FAILURE,
	CUSTOMER_DATA_LOAD_SUCCESSFULL as CUSTOMER_STATE_LOAD_SUCCESSFULL,
	LOADING,
} from "../actions/constants/actionTypes";
import { TrackType } from "../components/dashboard/Home";
import { NO_USER_FOUND_FOR_CUSTOMER } from "../constants/errorMessages";

export default function customerStateReducer(
	state: CustomerStateType,
	action: ActionType,
): CustomerStateType {
	switch (action.type) {
		case CUSTOMER_STATE_LOAD_SUCCESSFULL:
			return {
				...action.payload,
				loading: false,
			} as CustomerStateType;
		case CUSTOMER_STATE_LOAD_FAILURE:
			return {
				loading: false,
				error: action.payload?.response?.status === 410 ? NO_USER_FOUND_FOR_CUSTOMER : action.payload.message
			} as CustomerStateType;
		case LOADING:
			return {
				...state,
				loading: true,
			} as CustomerStateType;
		default:
			return state;
	}
}

export type CustomerStateType = {
	track: TrackType;
	queue: Array<TrackType>;
	error: string;
	playing: boolean;
	loading: boolean;
	restaurantName: string;
	secondsQueued: number;
	username: string;
};
