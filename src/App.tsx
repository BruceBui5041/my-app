import * as React from 'react';
import { MyMapComponent } from './components/maps/Maps';
import * as firebase from 'firebase';
import { MapContent } from './components/map-content/MapContent';
import './App.css';
import { connect } from 'react-redux';
import { AppState } from './app-state/reducer';

interface State {
	markers: google.maps.Marker[];
}

interface MapStateToProps {
	myLocation: { lat: number; lng: number };
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
	myLocation: { lat: state.myLocation.lat, lng: state.myLocation.lng }
});

type AllPropsType = MapStateToProps & any;

class App extends React.Component<AllPropsType, State> {
	myLocation: google.maps.Marker;

	componentDidMount() {
		const firebaseConfig = {
			apiKey: 'AIzaSyD9R-ZTTA0uDkEb6hClBx4HfF-VVjMTTXI',
			authDomain: 'thereuare-dev.firebaseapp.com',
			databaseURL: 'https://thereuare-dev.firebaseio.com',
			projectId: 'thereuare-dev',
			storageBucket: 'thereuare-dev.appspot.com',
			messagingSenderId: '475838238815',
			appId: '1:475838238815:web:780fa25fd9e56098c6cbea',
			measurementId: 'G-0VH01Y2J62'
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		firebase.analytics();
	}

	render() {
		return (
			<div className="App">
				<MyMapComponent
					defaultZoom={16}
					defaultCenter={{ lat: this.props.myLocation.lat, lng: this.props.myLocation.lng }}>
					<MapContent />
				</MyMapComponent>
			</div>
		);
	}
}

export default connect(mapStateToProps, null)(App);
