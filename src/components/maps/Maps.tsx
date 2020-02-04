import * as React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

interface MapProps {
	defaultZoom: number;
	defaultCenter: { lat: number; lng: number };
	children?: any;
}

class Map extends React.Component<MapProps> {
	constructor(props: MapProps) {
		super(props);
	}

	render() {
		return (
			<GoogleMap
				center={this.props.defaultCenter}
				defaultZoom={this.props.defaultZoom}
				defaultCenter={this.props.defaultCenter}>
				{this.props.children}
			</GoogleMap>
		);
	}
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export const MyMapComponent = (props: MapProps) => {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<WrappedMap
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA7cqKOztKjY3jcal8BUxufEIhERMsHVN4`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100%` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				{...props}
			/>
		</div>
	);
};
