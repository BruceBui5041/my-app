import * as React from 'react';
import { Marker } from 'react-google-maps';

interface CustomMarkerProps {
	marker: google.maps.Marker;
	// onClick: (marker: google.maps.Marker) => void;
}

const marker = React.memo((props: CustomMarkerProps) => {
	return (
		<Marker
			key={props.marker.getTitle() || ''}
			position={props.marker.getPosition() || null || undefined}
			title={props.marker.getTitle() || ''}
		/>
	);
});

export const MyMarker = marker;
