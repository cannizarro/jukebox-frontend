import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import {
	faPlay,
	faPause,
	faForwardFast,
	faFastBackward,
} from "@fortawesome/free-solid-svg-icons";
import { DeviceType } from "./Home";
import {
	pausePlayback,
	resumePlayback,
	skipNext,
	skipPrevious,
} from "../../actions/playbackStateActions";
import { ActionType } from "../../actions/constants/actionTypes";

export default function Remote(props: PropType) {
	function onPauseClick() {
		props.playing
			? pausePlayback(props.dispatch, props.device.id)
			: resumePlayback(props.dispatch, props.device.id);
	}

	return (
		<div>
			<Button
				color="primary"
				className="m-2"
				disabled={props.actionInProcess}
				onClick={() =>
					skipPrevious(
						props.dispatch,
						props.device.id,
					)
				}
			>
				<FontAwesomeIcon icon={faFastBackward} />
			</Button>
			<Button
				color="primary"
				className="m-2"
				onClick={onPauseClick}
				disabled={props.actionInProcess}
			>
				<FontAwesomeIcon icon={props.playing ? faPause : faPlay} />
			</Button>
			{props.nextAvailable && (
				<Button
					color="primary"
					className="m-2"
					disabled={props.actionInProcess}
					onClick={() =>
						skipNext(
							props.dispatch,
							props.device.id,
						)
					}
				>
					<FontAwesomeIcon icon={faForwardFast} />
				</Button>
			)}
		</div>
	);
}

type PropType = {
	playing: boolean;
	device: DeviceType;
	dispatch: React.Dispatch<ActionType>;
	nextAvailable: boolean;
	actionInProcess: boolean;
};
