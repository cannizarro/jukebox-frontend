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

export function isPopulated(array: Array<unknown>): boolean {
	return array && Array.isArray(array) && array.length > 0;
}

export function getImageUrl(imagePath: string){
	return window.location.origin + "/" + imagePath;
}