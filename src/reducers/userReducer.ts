import {
	ActionType,
	CLEAR_RESTAURANT_NAME_INPUT_ERROR,
	RESTAURANT_UPDATE_FAILURE,
	RESTAURANT_UPDATE_SUCCESSFUL,
	SET_USER_RESTAURANT,
	USER_LOADING,
	USER_LOGIN_FAILURE,
	USER_LOGIN_SUCCESSFULL,
	USER_LOGOUT_FAILURE,
	USER_LOGOUT_SUCCESSFUL,
	USER_REGISTRATION_FAILURE,
	USER_REGISTRATION_SUCCESSFULL,
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
		case USER_REGISTRATION_SUCCESSFULL:
			// replacing the current url containing query string with hostname
			window.location.replace(window.location.href.split("?")[0]);
			return {
				registered: true,
			} as UserType;
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
				restaurantName: action.payload,
			} as UserType;
		case RESTAURANT_UPDATE_FAILURE:
			return {
				...state,
				error: action.payload,
			} as UserType;
		case CLEAR_RESTAURANT_NAME_INPUT_ERROR:
			return {
				...state,
				error: "",
			} as UserType;
		case SET_USER_RESTAURANT:
			return {
				...state,
				restaurantName: action.payload,
			} as UserType;
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
	error: string;
};
