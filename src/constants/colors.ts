import colorsString from "../scss/_colors.scss?inline";

export const colors = convertStringToObject();

function convertStringToObject(): ColorType {
	const keyValuePairs = colorsString
		.replace(/:export\s*{/, "")
		.replace(/}\s*$/, "")
		.trim()
		.split(";");

	const resultObject = {};

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
	primary: string;
	dark: string;
	pdfBackground: string;
	primaryLight: string;
};