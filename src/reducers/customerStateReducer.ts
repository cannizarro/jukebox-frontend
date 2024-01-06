import {
	ActionType,
	CUSTOMER_DATA_LOAD_FAILURE as CUSTOMER_STATE_LOAD_FAILURE,
	CUSTOMER_DATA_LOAD_SUCCESSFULL as CUSTOMER_STATE_LOAD_SUCCESSFULL,
	LOADING,
} from "../actions/constants/actionTypes";
import { TrackType } from "../components/Home";

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
				error: action.payload.message,
				loading: false,
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
};
