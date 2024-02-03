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
	PLAYBACK_STATE_UPDATE,
} from "../actions/constants/actionTypes";
import { SpotifyStateType } from "../components/dashboard/Home";
import { NO_PLAYBACK_ERROR } from "../constants/errorMessages";
import { formatDateTo12Hour } from "../utils/genericUtils";

export default function playbackStateReducer(
	state: SpotifyStateType,
	action: ActionType,
): SpotifyStateType {
	switch (action.type) {
		case PLAYBACK_PAUSE_SUCCESSFULL:
			return {
				...state,
				actionInProcess: false,
				playing: false,
			} as SpotifyStateType;
		case PLAYBACK_PAUSE_FAILURE:
			return getStateForError(
				state,
				action.payload?.response?.status,
				false,
			);
		case PLAYBACK_RESUME_SUCCESSFULL:
			return {
				...state,
				actionInProcess: false,
				playing: true,
			} as SpotifyStateType;
		case PLAYBACK_RESUME_FAILURE:
			return getStateForError(
				state,
				action.payload?.response?.status,
				true,
			);
		case PLAYBACK_SKIP_NEXT_SUCCESSFULL:
		case PLAYBACK_SKIP_PREVIOUS_SUCCESSFULL:
			return {
				...state,
				actionInProcess: false,
			};
		case PLAYBACK_SKIP_NEXT_FAILURE:
		case PLAYBACK_SKIP_PREVIOUS_FAILURE:
			return getStateForError(
				state,
				action.payload?.response?.status,
				state.playing,
			);
		case PLAYBACK_STATE_UPDATE:
			return {
				...((action.payload && action.payload.data
					? JSON.parse(action.payload.data)
					: {}) as SpotifyStateType),
				actionInProcess: state.actionInProcess,
				loading: false,
			};
		case ACTION_IN_PROCESS:
			return {
				...state,
				actionInProcess: true,
			};
		case LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}

function getStateForError(
	state: SpotifyStateType,
	status: number,
	playingOnError: boolean,
): SpotifyStateType {
	switch (status) {
		case 403:
			return {
				...state,
				actionInProcess: false,
				playing: playingOnError,
			} as SpotifyStateType;
		case 410:
			return {
				playing: false,
				timestamp: formatDateTo12Hour(new Date()),
				error: NO_PLAYBACK_ERROR,
			} as SpotifyStateType;
		default:
			return {
				...state,
				actionInProcess: false,
			};
	}
}
