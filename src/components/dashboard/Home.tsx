import useWebSocket, { ReadyState, SendMessage } from "react-use-websocket";
import { useContext, useEffect, useReducer, useRef } from "react";
import Queue from "../common/Queue.tsx";
import ConnectionInfo from "./ConnectionInfo.tsx";
import playbackStateReducer from "../../reducers/playbackStateReducer.ts";
import {
	ActionType,
	PLAYBACK_STATE_UPDATE,
} from "../../actions/constants/actionTypes.ts";
import { customSendMessage, isPopulated } from "../../utils/genericUtils.ts";
import { UserContext } from "../../providers/UserContextProvider.tsx";
import { RESTAURANT_NAME_PLACEHOLDER } from "../../constants/messageConstants.ts";
import { dismissToast, setRestaurantName, updateOnline } from "../../actions/userActions.ts";
import Player from "./Player.tsx";
import CustomToast from "../common/CustomToast.tsx";
import CustomInput from "../common/CustomInput.tsx";
import CustomSwitch from "../common/CustomSwitch.tsx";

export default function Home() {
	const userContext = useContext(UserContext);
	const [spotifyState, dispatch] = useReducer(
		playbackStateReducer,
		{} as SpotifyStateType,
	);
	const { sendMessage, readyState } = useWebSocket(
		import.meta.env.VITE_WEBSOCKET_BASE_URL + "/ws/state",
		{
			onMessage: (event) =>
				dispatch({
					type: PLAYBACK_STATE_UPDATE,
					payload: event,
				} as ActionType),
		},
	);
	const ref = useRef(0);

	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			customSendMessage(sendMessage, dispatch);
			ref.current = setInterval(
				() => customSendMessage(sendMessage, dispatch),
				60000,
			);
		} else {
			customClearInterval(ref);
		}
		return () => customClearInterval(ref);
	}, [readyState, sendMessage]);

	function handleUpdateClick() {
		setRestaurantName(
			userContext.dispatch,
			(document.getElementById("restaurant_name") as HTMLInputElement)
				?.value,
		);
	}

	return (
		<div className="activity d-flex flex-column">
			<CustomSwitch
				checked={userContext.user.online}
				onChange={() => {updateOnline(userContext.dispatch, !userContext.user.online)}}
				label={userContext.user.online ? "Online and accepting songs" : "Not accepting songs"}
				disabled={userContext.user.updateInProgress}
			/>
			<CustomToast title="User Update Error" error={userContext.user.error} dismiss={() => dismissToast(userContext.dispatch)}/>
			{
				!userContext.user.restaurantName && 
				<CustomInput placeholder={RESTAURANT_NAME_PLACEHOLDER} buttonClick={handleUpdateClick} disabled={userContext.user.updateInProgress} buttonText="Update"/>
			}
			{
				spotifyState.loading && 
				<div className="dot-pulse ms-auto me-auto my-4" />
			}
			<Player
				{...spotifyState}
				{...{
					dispatch,
					sendMessage,
					nextAvailable: isPopulated(spotifyState.queue),
				}}
			/>
			{isPopulated(spotifyState.queue) && <Queue {...spotifyState} secondsQueued={null} username={null}/>}
			<ConnectionInfo {...spotifyState} readyState={readyState} />
		</div>
	);
}

function customClearInterval(ref: React.MutableRefObject<number>) {
	clearInterval(ref?.current);
	ref.current = 0;
}

export type SpotifyStateType = {
	track: TrackType;
	device: DeviceType;
	timestamp: string;
	queue: Array<TrackType>;
	error: string;
	playing: boolean;
	actionInProcess: boolean;
	sendMessage: SendMessage;
	loading: boolean;
};

export type TrackType = {
	id: string;
	name: string;
	album: string;
	artists: Array<string>;
	image: string;
	length: number;
};

export type DeviceType = {
	name: string;
	id: string;
};
