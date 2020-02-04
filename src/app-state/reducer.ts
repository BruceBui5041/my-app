import { ActionsType, actionsType } from './actions';

export interface ReducerType {
	myLocation: { lat: number; lng: number };
	anonymousUserId: string;
	markers: google.maps.Marker[];
}

export const initialState: ReducerType = {
	myLocation: { lat: 0, lng: 0 },
	anonymousUserId: 'testing_id1',
	markers: []
};

export function reducer(state: ReducerType = initialState, action: ActionsType): ReducerType {
	switch (action.type) {
		case actionsType.UPDATE_MY_LOCATION: {
			state.myLocation.lat = action.myLocation.lat;
			state.myLocation.lng = action.myLocation.lng;
			return { ...state };
		}

		case actionsType.UPDATE_MARKER: {
			state.markers.push(action.marker);
			console.log('abcd', action.marker.getTitle());
			return { ...state };
		}

		default:
			return state;
	}
}

export type AppState = ReturnType<typeof reducer>;
