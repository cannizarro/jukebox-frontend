import { ListGroup, ListGroupItem } from "reactstrap";
import { TrackType } from "../Home";

export default function Queue(props: PropType) {
	return (
		<ListGroup className="m-2">
			{props.queue.map((track) => (
				<ListGroupItem className="d-flex" key={track.id}>
					<img
						alt="track image"
						className="rounded"
						src={track.image}
						width={40}
						height={40}
					/>
					<div className="d-flex flex-column ms-2">
						<h6>{track.name}</h6>
						<small>{track.album}</small>
					</div>
				</ListGroupItem>
			))}
		</ListGroup>
	);
}

type PropType = {
	queue: Array<TrackType>;
};
