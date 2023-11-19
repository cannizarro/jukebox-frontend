export type ActionType = {
    type: string,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    payload: any
}

export const USER_LOGIN_SUCCESSFULL = "USER_LOGIN_SUCCESSFULL";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_REGISTRATION_SUCCESSFULL = "USER_REGISTRATION_SUCCESSFULL";
export const USER_REGISTRATION_FAILURE = "USER_REGISTRATION_FAILURE";
export const USER_LOADING = "USER_LOADING";