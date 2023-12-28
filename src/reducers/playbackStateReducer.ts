import { ACTION_IN_PROCESS, ActionType, PLAYBACK_PAUSE_FAILURE, PLAYBACK_PAUSE_SUCCESSFULL, PLAYBACK_RESUME_FAILURE, PLAYBACK_RESUME_SUCCESSFULL, PLAYBACK_STATE_UPDATE } from "../actions/constants/actionTypes";
import { SpotifyStateType } from "../components/Home";

export default function playbackStateReducer(state: SpotifyStateType, action: ActionType): SpotifyStateType{

    switch(action.type){
        case PLAYBACK_PAUSE_SUCCESSFULL:
            return {
                ...state,
                actionInProcess: false,
                playing: false
            } as SpotifyStateType;
        case PLAYBACK_PAUSE_FAILURE:
            return {
                ...state,
                actionInProcess: false
            } as SpotifyStateType;
        case PLAYBACK_RESUME_SUCCESSFULL:
            return {
                ...state,
                actionInProcess: false,
                playing: true
            } as SpotifyStateType;
        case PLAYBACK_RESUME_FAILURE:
            return {
                ...state,
                actionInProcess: false
            } as SpotifyStateType;
        case PLAYBACK_STATE_UPDATE:
            return {
                ...((action.payload && action.payload.data ? JSON.parse(action.payload.data) : {}) as SpotifyStateType),
                actionInProcess: state.actionInProcess
            };
        case ACTION_IN_PROCESS:
            return {
                ...state,
                actionInProcess: true
            }

        default:
            return state;
    }

}