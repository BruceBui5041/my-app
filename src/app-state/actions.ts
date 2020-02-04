export const actionsType = {
	UPDATE_MY_LOCATION: 'UPDATE_MY_LOCATION',
	UPDATE_MARKER: 'UPDATE_MARKER'
};

export interface UpdateMyLocationType {
	type: string;
	myLocation: { lat: number; lng: number };
}

export interface UpdateMarkerType {
	type: string;
	marker: google.maps.Marker;
}

export function updateMyLocation(myLocation: { lat: number; lng: number }): UpdateMyLocationType {
	return {
		type: actionsType.UPDATE_MY_LOCATION,
		myLocation
	};
}

export function updateMarker(marker: google.maps.Marker): UpdateMarkerType {
	return {
		type: actionsType.UPDATE_MARKER,
		marker
	};
}

export type ActionsType = UpdateMyLocationType & UpdateMarkerType;
