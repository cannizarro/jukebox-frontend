import { NavLink as RRLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

export default function CustomLink(props: PropType){
	return (
		<NavItem className={"mx-2" + (props.isLast ? " me-auto" : "")}>
			<NavLink
				tag={RRLink}
				children={props.children}
				to={props.to}
				target={props.target}
			/>
		</NavItem>
	);
}

type PropType = LinkPropType & {
	isLast: boolean;
}

export type LinkPropType = {
	children: React.ReactNode;
    to: string;
    target: string;
}