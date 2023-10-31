import { invokeRestApi } from "../api/axiosHelper";
import { ActionType, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESSFULL, USER_REGISTRATION_FAILURE, USER_REGISTRATION_SUCCESSFULL } from "./constants/actionTypes";

export function registerUser(dispatch: React.Dispatch<ActionType>, params: object): void{
    invokeRestApi("get", USER_REGISTRATION_SUCCESSFULL, USER_REGISTRATION_FAILURE, "/public/registerUser", params, null, dispatch);
}

export function loginUser(dispatch: React.Dispatch<ActionType>): void{
    invokeRestApi("get", USER_LOGIN_SUCCESSFULL, USER_LOGIN_FAILURE, "/admin/user", null, null, dispatch);
}