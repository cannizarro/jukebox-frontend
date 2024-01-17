export const APP_NAME = "Baajaa";
export const ACTIVITY_PADDING_TOP_WITH_RESTAURANT = "84px";
export const ACTIVITY_PADDING_TOP_WITHOUT_RESTAURANT = "74px";


export const CUSTOMER_SEARCH_PLACEHOLDER = (seconds: number) => 
    seconds > 1 ?
    `Your song willl play in ${Math.ceil(seconds/60)} minutes` : 
    `Your song willl play in ${Math.ceil(seconds/60)} minute`;
