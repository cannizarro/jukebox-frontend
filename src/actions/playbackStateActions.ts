import { invokeRestApi } from "../api/axiosHelper";
import { ACTION_IN_PROCESS, ActionType, PLAYBACK_PAUSE_FAILURE, PLAYBACK_PAUSE_SUCCESSFULL, PLAYBACK_RESUME_FAILURE, PLAYBACK_RESUME_SUCCESSFULL, PLAYBACK_SKIP_NEXT_FAILURE, PLAYBACK_SKIP_NEXT_SUCCESSFULL } from "./constants/actionTypes";

export function pausePlayback(dispatch: React.Dispatch<ActionType>, deviceId: string){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("put", PLAYBACK_PAUSE_SUCCESSFULL, PLAYBACK_PAUSE_FAILURE, "/admin/pause", {deviceId}, null, dispatch);
}

export function resumePlayback(dispatch: React.Dispatch<ActionType>, deviceId: string){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("put", PLAYBACK_RESUME_SUCCESSFULL, PLAYBACK_RESUME_FAILURE, "/admin/resume", {deviceId}, null, dispatch);
}

export function skipNext(dispatch: React.Dispatch<ActionType>, deviceId: string){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("post", PLAYBACK_SKIP_NEXT_SUCCESSFULL, PLAYBACK_SKIP_NEXT_FAILURE, "/admin/skipNext", {deviceId}, null, dispatch);
}