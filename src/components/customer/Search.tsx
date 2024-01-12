import { Button, Input, InputGroup, Toast, ToastBody, ToastHeader } from "reactstrap";
import { CUSTOMER_SEARCH_PLACEHOLDER } from "../../constants/constants";
import searchStateReducer, { SearchStateType } from "../../reducers/searchStateReducer";
import { useReducer } from "react";
import { dismissToast, search } from "../../actions/searchActions";
import { isPopulated } from "../../utils/genericUtils";
import Queue from "../common/Queue";

export default function Search(props: PropsType){

    const [searchState, dispatch] = useReducer(
		searchStateReducer,
		{page: 0} as SearchStateType,
	);

    function handleSearch() {
		search(
            (document.getElementById("restaurant_name") as HTMLInputElement)?.value,
            searchState.page,
            props.username,
            dispatch
        )
	}

    return (
        <>
			<Toast
				className="fixed-bottom m-4 text-danger"
				isOpen={Boolean(searchState.error)}
			>
				<ToastHeader
					className="text-danger bg-secondary"
					toggle={() => dismissToast(dispatch)}
				>
					Error
				</ToastHeader>
				<ToastBody>{searchState.error}</ToastBody>
			</Toast>
            <InputGroup className="px-2 pb-2">
                <Input
                    placeholder={CUSTOMER_SEARCH_PLACEHOLDER(Math.ceil(props.secondsQueued/60))}
                    id="restaurant_name"
                />
                <Button color="primary" onClick={handleSearch} disabled={searchState.loading}>
                    Search
                </Button>
            </InputGroup>
            {searchState.loading && <div className="dot-pulse ms-auto me-auto my-4" />}
            {isPopulated(searchState.tracks) && <Queue queue={searchState.tracks} secondsQueued={searchState.secondsQueued} username={props.username}/>}
        </>

    );
}

type PropsType = {
    username: string;
    secondsQueued: number;
}

