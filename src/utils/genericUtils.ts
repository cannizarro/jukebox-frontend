import { SendMessage } from "react-use-websocket";
import { ActionType, LOADING } from "../actions/constants/actionTypes";

export function formatStringTo12HourDate(dateString: string): string {
	return formatDateTo12Hour(new Date(dateString));
}

export function formatDateTo12Hour(date: Date) {
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true, // Use 12-hour clock
	};
	return date.toLocaleDateString(
		"en-US",
		options as Intl.DateTimeFormatOptions,
	);
}

export function customSendMessage(
	sendMessage: SendMessage,
	dispatch: React.Dispatch<ActionType>,
): void {
	dispatch({ type: LOADING } as ActionType);
	sendMessage("state");
}

export function isPopulated(array: Array<unknown>): boolean {
	return array && Array.isArray(array) && array.length > 0;
}
