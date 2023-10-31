import { ActionType, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESSFULL, USER_REGISTRATION_FAILURE, USER_REGISTRATION_SUCCESSFULL  } from "../actions/constants/actionTypes";

export default function userContextReducer(state: UserType, action: ActionType): UserType{
    switch(action.type){
        case USER_LOGIN_SUCCESSFULL:
            return action.payload as UserType;
        case USER_REGISTRATION_SUCCESSFULL:
            return state;
        case USER_LOGIN_FAILURE:
        case USER_REGISTRATION_FAILURE:
            return {errorMessage: action.payload.message} as UserType;
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
    errorMessage: string
}