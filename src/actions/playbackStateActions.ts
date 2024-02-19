import { invokeRestApi } from "../api/axiosHelper";
import {
	ACTION_IN_PROCESS,
	ActionType,
	LOADING,
	PLAYBACK_PAUSE_FAILURE,
	PLAYBACK_PAUSE_SUCCESSFULL,
	PLAYBACK_RESUME_FAILURE,
	PLAYBACK_RESUME_SUCCESSFULL,
	PLAYBACK_SKIP_NEXT_FAILURE,
	PLAYBACK_SKIP_NEXT_SUCCESSFULL,
	PLAYBACK_SKIP_PREVIOUS_FAILURE,
	PLAYBACK_SKIP_PREVIOUS_SUCCESSFULL,
	PLAYBACK_STATE_UPDATE_FAILURE,
	PLAYBACK_STATE_UPDATE_SUCCESSFUL,
} from "./constants/actionTypes";

export function pausePlayback(
	dispatch: React.Dispatch<ActionType>,
	deviceId: string,
) {
	dispatch({ type: ACTION_IN_PROCESS } as ActionType);
	invokeRestApi(
		"put",
		PLAYBACK_PAUSE_SUCCESSFULL,
		PLAYBACK_PAUSE_FAILURE,
		"/admin/pause",
		{ deviceId },
		null,
		dispatch,
	);
}

export function resumePlayback(
	dispatch: React.Dispatch<ActionType>,
	deviceId: string,
) {
	dispatch({ type: ACTION_IN_PROCESS } as ActionType);
	invokeRestApi(
		"put",
		PLAYBACK_RESUME_SUCCESSFULL,
		PLAYBACK_RESUME_FAILURE,
		"/admin/resume",
		{ deviceId },
		null,
		dispatch,
	);
}

export function skipNext(
	dispatch: React.Dispatch<ActionType>,
	deviceId: string,
) {
	dispatch({ type: ACTION_IN_PROCESS } as ActionType);
	invokeRestApi(
		"post",
		PLAYBACK_SKIP_NEXT_SUCCESSFULL,
		PLAYBACK_SKIP_NEXT_FAILURE,
		"/admin/skipNext",
		{ deviceId },
		null,
		dispatch,
	).then(() => fetchState(dispatch));
}

export function skipPrevious(
	dispatch: React.Dispatch<ActionType>,
	deviceId: string,
) {
	dispatch({ type: ACTION_IN_PROCESS } as ActionType);
	invokeRestApi(
		"post",
		PLAYBACK_SKIP_PREVIOUS_SUCCESSFULL,
		PLAYBACK_SKIP_PREVIOUS_FAILURE,
		"/admin/skipPrevious",
		{ deviceId },
		null,
		dispatch,
	).then(() => fetchState(dispatch));
}

export function fetchState(	dispatch: React.Dispatch<ActionType> ){
	dispatch({ type: LOADING } as ActionType);
	invokeRestApi(
		"get",
		PLAYBACK_STATE_UPDATE_SUCCESSFUL,
		PLAYBACK_STATE_UPDATE_FAILURE,
		"/admin/state",
		null,
		null,
		dispatch,
	);
}