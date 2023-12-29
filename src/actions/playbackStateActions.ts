import { SendMessage } from "react-use-websocket";
import { invokeRestApi } from "../api/axiosHelper";
import { ACTION_IN_PROCESS, ActionType, PLAYBACK_PAUSE_FAILURE, PLAYBACK_PAUSE_SUCCESSFULL, PLAYBACK_RESUME_FAILURE, PLAYBACK_RESUME_SUCCESSFULL, PLAYBACK_SKIP_NEXT_FAILURE, PLAYBACK_SKIP_NEXT_SUCCESSFULL, PLAYBACK_SKIP_PREVIOUS_FAILURE, PLAYBACK_SKIP_PREVIOUS_SUCCESSFULL } from "./constants/actionTypes";
import { customSendMessage } from "../utils/genericUtils";

export function pausePlayback(dispatch: React.Dispatch<ActionType>, deviceId: string){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("put", PLAYBACK_PAUSE_SUCCESSFULL, PLAYBACK_PAUSE_FAILURE, "/admin/pause", {deviceId}, null, dispatch);
}

export function resumePlayback(dispatch: React.Dispatch<ActionType>, deviceId: string){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("put", PLAYBACK_RESUME_SUCCESSFULL, PLAYBACK_RESUME_FAILURE, "/admin/resume", {deviceId}, null, dispatch);
}

export function skipNext(dispatch: React.Dispatch<ActionType>, deviceId: string, sendMessage: SendMessage){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("post", PLAYBACK_SKIP_NEXT_SUCCESSFULL, PLAYBACK_SKIP_NEXT_FAILURE, "/admin/skipNext", {deviceId}, null, dispatch)
        .then(() => customSendMessage(sendMessage, dispatch));
}

export function skipPrevious(dispatch: React.Dispatch<ActionType>, deviceId: string, sendMessage: SendMessage){
    dispatch({type: ACTION_IN_PROCESS} as ActionType)
    invokeRestApi("post", PLAYBACK_SKIP_PREVIOUS_SUCCESSFULL, PLAYBACK_SKIP_PREVIOUS_FAILURE, "/admin/skipPrevious", {deviceId}, null, dispatch)
        .then(() => customSendMessage(sendMessage, dispatch));
}