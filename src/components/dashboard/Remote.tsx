import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Spinner } from "reactstrap";
import {
	faPlay,
	faPause,
	faForwardFast,
} from "@fortawesome/free-solid-svg-icons";
import { TrackType } from "../Home";

export default function Remote(props: PropType) {
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
									<Button color="primary" className="m-2">
										<FontAwesomeIcon icon={props.playing ? faPause : faPlay} />
									</Button>
									<Button color="primary" className="m-2">
										<FontAwesomeIcon icon={faForwardFast} />
									</Button>
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
	playing: boolean;
	error: string;
	queueEmpty: boolean;
};
