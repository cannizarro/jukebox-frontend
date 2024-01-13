import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { DeviceType, TrackType } from "../dashboard/Home";
import { ActionType } from "../../actions/constants/actionTypes";
import { SendMessage } from "react-use-websocket";
import Remote from "./Remote";
import { Fade } from "react-awesome-reveal";

export default function Player(props: PlayerPropType) {
	return (
		<Card color="secondary" className="p-2 m-2">
			<CardBody>
				{props.error || props.track ? (
					<>
						<CardTitle
							tag="h5"
							className="d-flex flex-wrap justify-content-center align-items-center mb-4"
						>
							{props.track && (
								<img
									className="rounded"
									alt="track image"
									src={props.track.image}
									width="10%"
								/>
							)}
							<span className="me-auto ms-2">
								<Fade key={props.track.id}>{props.track ? props.track.name : props.error}</Fade>
							</span>
							{props.track &&
								props.dispatch &&
								props.sendMessage &&
								props.device && (
									<Remote
										{...props}
										dispatch={props.dispatch}
										sendMessage={props.sendMessage}
										device={props.device}
									/>
								)}
						</CardTitle>
						{props.track && (
							<Fade key={props.track.id}>
								<CardSubtitle tag="h6">
									{props.track.album}
								</CardSubtitle>
								<CardText>
									{props.track.artists.join(", ")}
								</CardText>
							</Fade>
						)}
					</>
				) : (
					<div className="dot-pulse ms-auto me-auto my-4" />
				)}
			</CardBody>
		</Card>
	);
}

export type PlayerPropType = {
	track: TrackType;
	error: string;
	playing: boolean;
	device: DeviceType | null;
	dispatch: React.Dispatch<ActionType> | null;
	nextAvailable: boolean;
	actionInProcess: boolean;
	sendMessage: SendMessage | null;
};
