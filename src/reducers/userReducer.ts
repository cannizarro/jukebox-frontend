import {
	ActionType,
	CLEAR_INPUT_ERROR,
	DISABLE_USER_INPUT_BUTTON as DISABLE_USER_INPUT,
	ONLINE_SWITCH_SUCCESSFULL,
	PRICE_UPDATE_SUCCESSFUL,
	RESTAURANT_UPDATE_SUCCESSFUL,
	SET_USER_RESTAURANT,
	UPDATE_FAILURE,
	USER_LOADING,
	USER_LOGIN_FAILURE,
	USER_LOGIN_SUCCESSFULL,
	USER_LOGOUT_FAILURE,
	USER_LOGOUT_SUCCESSFUL,
	USER_REGISTRATION_FAILURE,
} from "../actions/constants/actionTypes";

export default function userContextReducer(
	state: UserType,
	action: ActionType,
): UserType {
	switch (action.type) {
		case USER_LOGIN_SUCCESSFULL:
			return {
				...state,
				...action.payload,
			};
		case USER_LOGIN_FAILURE:
		case USER_REGISTRATION_FAILURE:
			return {} as UserType;
		case USER_LOGOUT_SUCCESSFUL:
			return {} as UserType;
		case USER_LOGOUT_FAILURE:
			return state;
		case USER_LOADING:
			return {
				isLoading: true,
				registered: state.registered,
			} as UserType;
		case RESTAURANT_UPDATE_SUCCESSFUL:
			return {
				...state,
				restaurantName: action.payload.restaurantName,
				updateInProgress: false
			} as UserType;
		case ONLINE_SWITCH_SUCCESSFULL:
			return {
				...state,
				online: action.payload.online,
				updateInProgress: false
			};
		case PRICE_UPDATE_SUCCESSFUL:
			return{
				...state,
				price: action.payload.price,
				updateInProgress: false
			}
		case UPDATE_FAILURE:
			return {
				...state,
				error: action.payload.message,
				updateInProgress: false
			} as UserType;
		case CLEAR_INPUT_ERROR:
			return {
				...state,
				error: "",
			} as UserType;
		case SET_USER_RESTAURANT:
			return {
				...state,
				restaurantName: action.payload,
			} as UserType;
		case DISABLE_USER_INPUT:
			return {
				...state,
				updateInProgress: true
			};
		default:
			return state;
	}
}

export type UserType = {
	username: string;
	displayName: string | null;
	createTimeStamp: string;
	updateTimeStamp: string;
	roles: Array<string>;
	registered: boolean;
	isLoading: boolean;
	restaurantName: string;
	updateInProgress: boolean;
	error: string;
	online: boolean;
	price: number;
};
