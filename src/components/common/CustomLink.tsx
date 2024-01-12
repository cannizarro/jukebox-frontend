import { NavLink as RRLink } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

export default function CustomLink(props: PropType){
	return (
		<NavItem className="mx-2">
			<NavLink
				tag={RRLink}
				{...props}
			/>
		</NavItem>
	);
}

export type PropType = {
    children: React.ReactNode,
    to: string,
    target: string
}