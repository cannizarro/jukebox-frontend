import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardTitle } from "reactstrap";
import {
	faPlay,
	faPause,
	faForwardFast,
} from "@fortawesome/free-solid-svg-icons";
import { TrackType } from "../Home";

export default function Remote(props: PropType) {
	return (
		<Card color="secondary" className="p-2 m-2">
			<CardTitle
				tag="h5"
				className="d-flex flex-nowrap justify-content-center align-items-center"
			>
				<span className="p-2 me-auto">Playing aasfd</span>
				<Button color="primary" className="m-2">
					<FontAwesomeIcon icon={props.playing ? faPause : faPlay} />
				</Button>
				<Button color="primary" className="m-2">
					<FontAwesomeIcon icon={faForwardFast} />
				</Button>
			</CardTitle>
		</Card>
	);
}

type PropType = {
	track: TrackType;
	playing: boolean;
};
