import { ListGroup, ListGroupItem } from "reactstrap";
import { TrackType } from "../Home";
import { useEffect, useState } from "react";
import Payment from "../customer/Payment";

export default function Queue(props: PropType) {
	const [expandedIndex, setExpandedIndex] = useState(-1);

	useEffect( () => setExpandedIndex(-1), [props.queue]);

	function handleItemClick(index: number){
		setExpandedIndex(index === expandedIndex ? -1 : index)
	}

	return (
		<ListGroup className="m-2">
			{props.queue.map((track, index) => (
				index === expandedIndex ? 
					<Payment key={track.id} track={track} secondsQueued={props.secondsQueued} onClick={ () => props.secondsQueued && handleItemClick(index) } username={props.username}/> :
					<ListGroupItem className="d-flex" key={track.id} onClick={ () => props.secondsQueued && handleItemClick(index) }>
							<img
								alt="track image"
								className="rounded"
								src={track.image}
								width="7%"
							/>
							<div className="d-flex flex-column mt-2 ms-4">
								<h6>{track.name}</h6>
								<small>{track.album}</small>
							</div>
					</ListGroupItem>
			))}
		</ListGroup>
	);
}


//secondsQueued null: not expandable
type PropType = {
	queue: Array<TrackType>;
	secondsQueued: number | null;
	username: string | null;
}
