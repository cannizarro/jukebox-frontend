import useWebSocket, { ReadyState, SendMessage } from "react-use-websocket";
import { useContext, useEffect, useReducer, useRef } from "react";
import Queue from "./dashboard/Queue.tsx";
import ConnectionInfo from "./dashboard/ConnectionInfo.tsx";
import playbackStateReducer from "../reducers/playbackStateReducer.ts";
import {
	ActionType,
	PLAYBACK_STATE_UPDATE,
} from "../actions/constants/actionTypes.ts";
import { customSendMessage, isPopulated } from "../utils/genericUtils.ts";
import { UserContext } from "../providers/UserContextProvider.tsx";
import {
	Button,
	Input,
	InputGroup,
	Toast,
	ToastBody,
	ToastHeader,
} from "reactstrap";
import { RESTAURANT_NAME_PLACEHOLDER } from "../constants/messageConstants.ts";
import { dismissToast, setRestaurantName } from "../actions/userActions.ts";
import Player from "./dashboard/Player.tsx";

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
			<Toast
				className="fixed-bottom m-4 text-danger"
				isOpen={Boolean(userContext.user.error)}
			>
				<ToastHeader
					className="text-danger bg-secondary"
					toggle={() => dismissToast(userContext.dispatch)}
				>
					Update Error
				</ToastHeader>
				<ToastBody>{userContext.user.error}</ToastBody>
			</Toast>
			{!userContext.user.restaurantName && (
				<InputGroup className="px-2 pb-2">
					<Input
						placeholder={RESTAURANT_NAME_PLACEHOLDER}
						id="restaurant_name"
					/>
					<Button color="primary" onClick={handleUpdateClick}>
						Update
					</Button>
				</InputGroup>
			)}
			{spotifyState.loading && (
				<div className="dot-pulse ms-auto me-auto my-4" />
			)}
			<Player
				{...spotifyState}
				{...{
					dispatch,
					sendMessage,
					nextAvailable: isPopulated(spotifyState.queue),
				}}
			/>
			{isPopulated(spotifyState.queue) && <Queue {...spotifyState} />}
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
};

export type DeviceType = {
	name: string;
	id: string;
};
