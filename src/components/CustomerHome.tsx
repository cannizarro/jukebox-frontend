import { useEffect, useReducer } from "react";
import { isPopulated } from "../utils/genericUtils";
import Player from "./dashboard/Player";
import Queue from "./common/Queue";
import customerStateReducer, {
	CustomerStateType,
} from "../reducers/customerStateReducer";
import { loadCustomerData } from "../actions/customerActions";
import { ActionType } from "../actions/constants/actionTypes";
import Search from "./customer/Search";

export default function CustomerHome(props: PropsType) {
	const [customerState, dispatch] = useReducer(
		customerStateReducer,
		{} as CustomerStateType,
	);

	useEffect(
		() =>
			loadCustomerData(
				dispatch,
				props.username,
				props.userDispatch,
			),
		[props.username, props.userDispatch],
	);

	return (
		<div
			className="activity d-flex flex-column"
		>
			{customerState.loading ?
				<div className="dot-pulse ms-auto me-auto my-4" /> :
				<>
				<Search username={props.username} secondsQueued={customerState.secondsQueued}/>
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
				{isPopulated(customerState.queue) && <Queue {...customerState} secondsQueued={null} username={null}/>}
				</>
			}
		</div>
	);
}

type PropsType = {
	username: string;
	userDispatch: React.Dispatch<ActionType>;
};
