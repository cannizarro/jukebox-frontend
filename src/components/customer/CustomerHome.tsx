import { useContext, useEffect, useReducer } from "react";
import { isPopulated } from "../../utils/genericUtils";
import Player from "../dashboard/Player";
import Queue from "../common/Queue";
import customerStateReducer, {
	CustomerStateType,
} from "../../reducers/customerStateReducer";
import { loadCustomerData } from "../../actions/customerActions";
import Search from "./Search";
import { useParams } from "react-router-dom";
import { UserContext } from "../../providers/UserContextProvider";

export default function CustomerHome() {
	const [customerState, dispatch] = useReducer(
		customerStateReducer,
		{} as CustomerStateType,
	);
	const params = useParams() as { username: string };
	const userDispatch = useContext(UserContext).dispatch;

	useEffect(
		() =>
			loadCustomerData(
				dispatch,
				params.username,
				userDispatch,
			),
		[params.username, userDispatch],
	);

	return (
		<div
			className="activity d-flex flex-column"
		>
			{customerState.loading ?
				<div className="dot-pulse ms-auto me-auto my-4" /> :
				<>
				{
					customerState.track?.id && 
					<>
						<Search username={params.username} secondsQueued={customerState.secondsQueued + customerState.track.length}/>
						<div className="px-2 pt-2">Now Playing: </div>
					</>
				}
				<Player
					{...{
						...customerState,
						nextAvailable: isPopulated(customerState.queue),
						dispatch: null,
						sendMessage: null,
						device: null,
						actionInProcess: false,
					}}
				/>
				{
					isPopulated(customerState.queue) && 
					<>
						<div className="px-2 pt-2">Songs already in queue: </div>
						<Queue {...customerState} secondsQueued={null} username={null}/>
					</>
				}
				</>
			}
		</div>
	);
}

