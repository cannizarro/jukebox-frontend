import useWebSocket, { ReadyState } from "react-use-websocket";
import Remote from "./dashboard/Remote";
import { useEffect, useReducer, useRef } from "react";
import Queue from "./dashboard/Queue.tsx";
import ConnectionInfo from "./dashboard/ConnectionInfo.tsx";
import playbackStateReducer from "../reducers/playbackStateReducer.ts";
import { ActionType, PLAYBACK_STATE_UPDATE } from "../actions/constants/actionTypes.ts";

export default function Home() {
	const [spotifyState, dispatch] = useReducer(playbackStateReducer, {} as SpotifyStateType);
	const { sendMessage, readyState } = 
		useWebSocket(
			import.meta.env.VITE_WEBSOCKET_BASE_URL + "/ws/state", 
			{onMessage: (event) => dispatch( { type:PLAYBACK_STATE_UPDATE, payload: event } as ActionType )}
		);
	const ref = useRef(0);

	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			sendMessage("state");
			ref.current = setInterval(() => sendMessage("state"), 30000);
		} else {
			customClearInterval(ref);
		}
		return () => customClearInterval(ref);
	}, [readyState, sendMessage]);

	return (
		<div className="activity d-flex flex-column">
			<Remote {...spotifyState} {...{dispatch, nextAvailable: isPopulated(spotifyState.queue)}}/>
			{isPopulated(spotifyState.queue) && <Queue {...spotifyState}/>}
			<ConnectionInfo {...spotifyState} readyState={readyState}/>
		</div>
	);
}

function customClearInterval(ref: React.MutableRefObject<number>) {
	clearInterval(ref?.current);
	ref.current = 0;
}

function isPopulated(array: Array<unknown>): boolean{
	return array && Array.isArray(array) && array.length > 0;
}

export type SpotifyStateType = {
	track: TrackType;
	device: DeviceType;
	timestamp: string;
	queue: Array<TrackType>;
	error: string;
	playing: boolean;
	actionInProcess: boolean;
};

export type TrackType = {
	id: string;
	name: string;
	album: string;
	artists: Array<string>;
	image: string;
};

export type DeviceType = {
	name: string;
	id: string;
};
