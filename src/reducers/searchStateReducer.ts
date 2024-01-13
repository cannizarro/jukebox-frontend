import { ActionType, CLEAR_SEARCH_ERROR, DISABLE_SEARCH_BUTTON, SEARCH_FAILURE, SEARCH_SUCCESSFULL } from "../actions/constants/actionTypes";
import { TrackType } from "../components/dashboard/Home";

export default function searchStateReducer(state: SearchStateType, action: ActionType): SearchStateType{
    switch(action.type){
        case SEARCH_SUCCESSFULL:
            return {
                error: "",
                tracks: action.payload.tracks,
                secondsQueued: action.payload.secondsQueued,
                page: state.page,
                loading: false
            } as SearchStateType;
        case SEARCH_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                loading: false
            } as SearchStateType;
        case CLEAR_SEARCH_ERROR:
            return {
                ...state,
                error: ""
            } as SearchStateType;
        case DISABLE_SEARCH_BUTTON:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export type SearchStateType = {
    error: string;
    tracks: Array<TrackType>;
    secondsQueued: number;
    page: number;
    loading: boolean;
}