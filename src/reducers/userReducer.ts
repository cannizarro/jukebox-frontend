import { ActionType, USER_LOADING, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESSFULL, USER_LOGOUT_FAILURE, USER_LOGOUT_SUCCESSFUL, USER_REGISTRATION_FAILURE, USER_REGISTRATION_SUCCESSFULL  } from "../actions/constants/actionTypes";

export default function userContextReducer(state: UserType, action: ActionType): UserType{
    switch(action.type){
        case USER_LOGIN_SUCCESSFULL:
            return {
                ...state,
                ...action.payload
            };
        case USER_REGISTRATION_SUCCESSFULL:
            // replacing the current url containing query string with hostname
            location.replace(window.location.href.split('?')[0]);
            return {
                registered: true
            } as UserType;
        case USER_LOGIN_FAILURE:
        case USER_REGISTRATION_FAILURE:
            return { } as UserType;
        case USER_LOGOUT_SUCCESSFUL:
            return { } as UserType;
        case USER_LOGOUT_FAILURE:
            return state;
        case USER_LOADING:
            return {
                isLoading: true,
                registered: state.registered
            } as UserType;
        default:
            return state;
    }
}

export type UserType = {
    username: string,
    displayName: string | null,
    createTimeStamp: string,
    updateTimeStamp: string,
    roles: Array<string>,
    registered: boolean,
    isLoading: boolean
}