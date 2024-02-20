export const RESTAURANT_NAME_PLACEHOLDER =
	"No restaurant name is set, please update to set your restaurant name.";


export const CUSTOMER_SEARCH_PLACEHOLDER = (seconds: number) => {
	const minutes = Math.ceil(seconds/60);
	const postfix = minutes > 1 ? "minutes" : "minute";
	return `Your song willl play in ${minutes} ${postfix}`;	
}

export const PRICE_PLACEHOLDER = (price: number) => `Current price is ${price}`;

export const PAYMENT_SUCCESS_MESSAGE = "Your song has been queued.";