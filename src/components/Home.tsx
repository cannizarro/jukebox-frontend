import useWebSocket, { ReadyState } from "react-use-websocket";
import Remote from "./dashboard/Remote";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../common/constants/colors.ts";
import { formatDateTo12Hour } from "../common/utils/dateFormatter.ts";

export default function Home() {
	const { sendMessage, lastMessage, readyState } = useWebSocket(
		import.meta.env.VITE_WEBSOCKET_BASE_URL + "/ws/state"
	);
	const spotifyState = (
		lastMessage && lastMessage.data ? JSON.parse(lastMessage.data) : {}
	) as SpotifyStateType;
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
		<div className="activity">
			{spotifyState.playing}
			<Remote {...spotifyState} />
			<div className="m-2 d-flex justify-content-end align-items-center">
				<FontAwesomeIcon
					className="me-2"
					icon={faCloud}
					color={
						readyState === ReadyState.OPEN
							? colors.success
							: colors.danger
					}
				/>
				{spotifyState &&
					spotifyState.timestamp &&
					"Last refresh: ".concat(
						formatDateTo12Hour(spotifyState.timestamp)
					)}
			</div>
		</div>
	);
}

function customClearInterval(ref: React.MutableRefObject<number>) {
	ref && clearInterval(ref.current);
}

type SpotifyStateType = {
	track: TrackType;
	device: DeviceType;
	currentlyPlayingType: string;
	playing: boolean;
	timestamp: string;
	queue: Array<TrackType>;
	error: string;
};

export type TrackType = {
	name: string;
	id: string;
	album: string;
	artists: Array<string>;
};

type DeviceType = {
	name: string;
	id: string;
	isRestricted: boolean;
};
