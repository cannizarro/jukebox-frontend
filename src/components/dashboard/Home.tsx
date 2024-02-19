import { useContext, useEffect, useReducer, useRef } from "react";
import Queue from "../common/Queue.tsx";
import ConnectionInfo from "./ConnectionInfo.tsx";
import playbackStateReducer from "../../reducers/playbackStateReducer.ts";
import { isPopulated } from "../../utils/genericUtils.ts";
import { UserContext } from "../../providers/UserContextProvider.tsx";
import { PRICE_PLACEHOLDER, RESTAURANT_NAME_PLACEHOLDER } from "../../constants/messageConstants.ts";
import { dismissToast, setRestaurantName, udpatePrice, updateOnline } from "../../actions/userActions.ts";
import Player from "./Player.tsx";
import CustomToast from "../common/CustomToast.tsx";
import CustomInput from "../common/CustomInput.tsx";
import CustomSwitch from "../common/CustomSwitch.tsx";
import { PRICE_EDIT_BOX_ID, RESTAURANT_EDIT_BOX_ID } from "../../constants/constants.ts";
import { fetchState } from "../../actions/playbackStateActions.ts";

export default function Home() {
	const userContext = useContext(UserContext);
	const [spotifyState, dispatch] = useReducer(
		playbackStateReducer,
		{} as SpotifyStateType,
	);
	const ref = useRef(0);

	useEffect(() => {
		fetchState(dispatch);
		ref.current = setInterval(
			() => fetchState(dispatch),
			60000,
		);
		return () => {
			clearInterval(ref?.current);
			ref.current = 0;
		};
	}, [dispatch]);

	function handleRestaurantUpdateClick() {
		setRestaurantName(
			userContext.dispatch,
			(document.getElementById(RESTAURANT_EDIT_BOX_ID) as HTMLInputElement)
				?.value,
		);
	}

	function handlePriceUpdateClick() {
		udpatePrice(
			userContext.dispatch,
			(document.getElementById(PRICE_EDIT_BOX_ID) as HTMLInputElement)
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
				<CustomInput placeholder={RESTAURANT_NAME_PLACEHOLDER} buttonClick={handleRestaurantUpdateClick} disabled={userContext.user.updateInProgress} buttonText="Update" id={RESTAURANT_EDIT_BOX_ID}/>
			}
			<CustomInput placeholder={PRICE_PLACEHOLDER(userContext.user.price)} buttonClick={handlePriceUpdateClick} disabled={userContext.user.updateInProgress} buttonText="Update" id={PRICE_EDIT_BOX_ID}/>
			{
				spotifyState.loading && 
				<div className="dot-pulse ms-auto me-auto my-4" />
			}
			<Player
				{...spotifyState}
				{...{
					dispatch,
					nextAvailable: isPopulated(spotifyState.queue),
				}}
			/>
			{isPopulated(spotifyState.queue) && <Queue {...spotifyState} secondsQueued={null} username={null}/>}
			<ConnectionInfo {...spotifyState}/>
		</div>
	);
}

export type SpotifyStateType = {
	track: TrackType;
	device: DeviceType;
	timestamp: string;
	queue: Array<TrackType>;
	error: string;
	playing: boolean;
	actionInProcess: boolean;
	loading: boolean;
};

export type TrackType = {
	id: string;
	name: string;
	album: string;
	artists: Array<string>;
	image: string;
	length: number;
	uri: string;
};

export type DeviceType = {
	name: string;
	id: string;
};
