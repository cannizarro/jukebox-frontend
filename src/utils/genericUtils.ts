export function formatDateTo12Hour(dateString: string): string {
	const date = new Date(dateString);

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