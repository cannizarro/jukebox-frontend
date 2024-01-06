import { useEffect, useReducer } from "react";
import { isPopulated } from "../utils/genericUtils";
import Player from "./dashboard/Player";
import Queue from "./dashboard/Queue";
import customerStateReducer, {
	CustomerStateType,
} from "../reducers/customerStateReducer";
import { loadCustomerData } from "../actions/customerActions";
import { ActionType } from "../actions/constants/actionTypes";

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
				props.isRestaurantNameAvailable,
			),
		[props.username, props.isRestaurantNameAvailable, props.userDispatch],
	);

	return (
		<div
			className="activity d-flex flex-column"
		>
			{customerState.loading && (
				<div className="dot-pulse ms-auto me-auto my-4" />
			)}
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
			{isPopulated(customerState.queue) && <Queue {...customerState} />}
		</div>
	);
}

type PropsType = {
	username: string;
	userDispatch: React.Dispatch<ActionType>;
	isRestaurantNameAvailable: boolean;
};
