import { useReader } from "@epubjs-react-native/core";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export default () => {
	const {
		theme,
		totalLocations,
		currentLocation,
		locations,
		goToLocation,
		section,
	} = useReader();
	const [currentPage, setCurrentPage] = useState(0);
	const [locationsList, setLocationsList] = useState<string[]>([]);

	const debounced = useDebounceCallback((page) => {
		const newLocation = locationsList[page];
		setCurrentPage(page);
		goToLocation(newLocation);
	}, 500);

	useEffect(() => {
		if (locations.length > 0) {
			const list = JSON.parse(locations.toString());
			setLocationsList(list);
			setCurrentPage(currentLocation?.start?.location ?? 0);
		}
	}, [locations, currentLocation]);

	return {
		debounced,
		section,
		currentPage,
		totalLocations,
		theme,
	};
};
