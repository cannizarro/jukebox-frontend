import { CUSTOMER_SEARCH_PLACEHOLDER } from "../../constants/constants";
import searchStateReducer, { SearchStateType } from "../../reducers/searchStateReducer";
import { useReducer } from "react";
import { dismissToast, search } from "../../actions/searchActions";
import { isPopulated } from "../../utils/genericUtils";
import Queue from "../common/Queue";
import CustomToast from "../common/CustomToast";
import CustomInput from "../common/CustomInput";

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
            <CustomToast title="Search Error" dismiss={() => dismissToast(dispatch)} error={searchState.error}/>
            <CustomInput buttonClick={handleSearch} disabled={searchState.loading} placeholder={CUSTOMER_SEARCH_PLACEHOLDER(props.secondsQueued)} buttonText="Search"/>
            {searchState.loading && <div className="dot-pulse ms-auto me-auto my-4" />}
            {isPopulated(searchState.tracks) && <Queue queue={searchState.tracks} secondsQueued={searchState.secondsQueued} username={props.username}/>}
        </>

    );
}

type PropsType = {
    username: string;
    secondsQueued: number;
}
