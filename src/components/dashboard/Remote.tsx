import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Spinner } from "reactstrap";
import {
	faPlay,
	faPause,
	faForwardFast,
} from "@fortawesome/free-solid-svg-icons";
import { DeviceType, TrackType } from "../Home";
import { pausePlayback, resumePlayback, skipNext } from "../../actions/playbackStateActions";
import { ActionType } from "../../actions/constants/actionTypes";

export default function Remote(props: PropType) {

	function onPauseClick(){
		props.playing ? 
			pausePlayback(props.dispatch, props.device.id):
			resumePlayback(props.dispatch, props.device.id);
	}

	return (
		<Card color="secondary" className="p-2 m-2">
			<CardBody>
				{
					props.error || props.track ?
					<>
						<CardTitle
							tag="h5"
							className="d-flex flex-wrap justify-content-center align-items-center mb-4"
						>
							{props.track && <img className="rounded" alt="track image" src={props.track.image} width={60}/>}
							<span className="me-auto ms-2">{props.track ? props.track.name : props.error}</span>
							{
								props.track && 
								<div>
									<Button color="primary" className="m-2" onClick={onPauseClick} disabled={props.actionInProcess}>
										<FontAwesomeIcon icon={props.playing ? faPause : faPlay} />
									</Button>
									{
										props.nextAvailable && 
										<Button color="primary" className="m-2" disabled={props.actionInProcess} onClick={() => skipNext(props.dispatch, props.device.id)}>
											<FontAwesomeIcon icon={faForwardFast} />
										</Button>
									}
								</div>
							}
						</CardTitle>
						{
							props.track &&
							<>
								<CardSubtitle tag="h6">{props.track.album}</CardSubtitle>
								<CardText>{props.track.artists.join(", ")}</CardText>
							</>
						}
					</> :
					<Spinner color="primary"/>
				}
			</CardBody>
		</Card>
	);
}

type PropType = {
	track: TrackType;
	error: string;
	playing: boolean;
	device: DeviceType;
	dispatch: React.Dispatch<ActionType>;
	nextAvailable: boolean;
	actionInProcess: boolean
};
