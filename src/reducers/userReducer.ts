import { ActionType, USER_LOADING, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESSFULL, USER_REGISTRATION_FAILURE, USER_REGISTRATION_SUCCESSFULL  } from "../actions/constants/actionTypes";

export default function userContextReducer(state: UserType, action: ActionType): UserType{
    switch(action.type){
        case USER_LOGIN_SUCCESSFULL:
            return {
                ...state,
                ...action.payload,
                errorMessage: "",
                isLoading: false
            };
        case USER_REGISTRATION_SUCCESSFULL:
            return {
                errorMessage: "",
                registered: true
            } as UserType;
        case USER_LOGIN_FAILURE:
        case USER_REGISTRATION_FAILURE:
            return { errorMessage: action.payload.message } as UserType;
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
    errorMessage: string,
    registered: boolean,
    isLoading: boolean
}