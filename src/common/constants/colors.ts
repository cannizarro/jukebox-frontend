import colorsString from "../../scss/_colors.scss?inline";

export const colors = convertStringToObject();

function convertStringToObject(): ColorType {
	// Remove unnecessary characters and split the string into an array
	const keyValuePairs = colorsString
		.replace(/:export\s*{/, "") // Remove ':export {'
		.replace(/}\s*$/, "") // Remove '}' at the end
		.trim() // Trim any leading/trailing whitespace
		.split(";"); // Split into an array of key-value pairs

	// Create an object to store the key-value pairs
	const resultObject = {};

	// Loop through the key-value pairs and populate the object
	keyValuePairs.forEach((pair) => {
		const [key, value] = pair.split(":");
		if (key && value) {
			// eslint-disable-next-line
			// @ts-ignore
			resultObject[key.trim()] = value.trim();
		}
	});

	return resultObject as ColorType;
}

type ColorType = {
	success: string;
	danger: string;
};
