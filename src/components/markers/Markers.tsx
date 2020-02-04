import * as React from 'react';
import * as firebase from 'firebase';
import { UPDATE_USER_COORDS_DATABASE_REF } from '../../constants';
// import { InfoWindow } from 'react-google-maps';
import { connect } from 'react-redux';
import { AppState } from 'app-state/reducer';
import { MyMarker } from './Marker';
import { setDataToDatabase } from '../../utils';
import { updateMyLocation, updateMarker } from '../../app-state/actions';
import { Dispatch } from 'redux';

interface CustomMarkerProps {}

interface MapStateToPropsType {
	anonymousUserId: string;
	markers: google.maps.Marker[];
}

interface MapDispatchToPropsType {
	updateMyLocation: (lat: number, lng: number) => void;
	updateMarker: (marker: google.maps.Marker) => void;
}

type Props = CustomMarkerProps & MapStateToPropsType & MapDispatchToPropsType;

class ListMarker extends React.Component<Props, any> {
	ids: string[] = ['testing_id1', 'testing_id2'];
	myLocation: google.maps.Marker;

	async componentDidMount() {
		await this.fetchingPositioData(this.ids);
		// fake my location
		const marker = new google.maps.Marker();
		marker.setTitle('My location');
		marker.setPosition({
			lat: 10.8469123,
			lng: 106.64093129999999
		});

		this.showPosition(marker.getPosition());

		if (navigator.geolocation) {
			// const options = {
			// 	enableHighAccuracy: true,
			// 	timeout: 5000,
			// 	maximumAge: 0
			// };
			// navigator.geolocation.getCurrentPosition(this.showPosition, this.errorCallback, options);
		} else {
			console.log('Geo Location not supported by browser');
		}
	}

	shouldComponentUpdate(nextProps: Props) {
		console.log('abcd', nextProps.markers);
		return true;
	}

	fetchingPositioData = async (ids: string[]) => {
		for (const id of ids) {
			const data = await firebase
				.database()
				.ref(`${UPDATE_USER_COORDS_DATABASE_REF}/${id}`)
				.once('value');
			const marker = new google.maps.Marker();
			marker.setTitle(id);
			marker.setPosition({
				lat: data.val().lat,
				lng: data.val().lng
			});
			this.props.updateMarker(marker);
		}
	};

	showPosition = (position: any) => {
		if (!this.myLocation) {
			this.myLocation = new google.maps.Marker();
			this.myLocation.setTitle('My location');

			this.myLocation.setPosition({
				lat: 10.8469123,
				lng: 106.64093129999999
			});

			this.props.updateMarker(this.myLocation);
		}

		setDataToDatabase(UPDATE_USER_COORDS_DATABASE_REF, 'testing_id', {
			lat: 10.8469123,
			lng: 106.64093129999999
		});

		this.props.updateMyLocation(10.8469123, 106.64093129999999);
	};

	errorCallback = (err: any) => {
		alert(err.message);
	};

	render() {
		return (
			<>
				{this.props.markers.map((marker: google.maps.Marker, index: number) => {
					console.log(index, marker);
					return <MyMarker key={marker.getTitle() || index} marker={marker} />;
				})}
				{/* {selectedMarker && (
					<InfoWindow
						onCloseClick={() => setSelectedMarker(undefined)}
						position={selectedMarker.getPosition() || undefined}>
						<div>{selectedMarker.getTitle() || ''}</div>
					</InfoWindow>
				)} */}
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
	updateMyLocation: (lat: number, lng: number) => dispatch(updateMyLocation({ lat, lng })),
	updateMarker: (marker: google.maps.Marker) => dispatch(updateMarker(marker))
});

const mapStateToProps = (state: AppState): MapStateToPropsType => ({
	anonymousUserId: state.anonymousUserId,
	markers: state.markers
});

export const Markers = connect(mapStateToProps, mapDispatchToProps)(ListMarker);

// const markerListComponent: any = React.memo((props: Props) => {
// 	const [selectedMarker, setSelectedMarker] = React.useState<google.maps.Marker>();
// 	let [myLocation, setMyLocation] = React.useState();
// 	const [markers, setMarker] = React.useState<google.maps.Marker[]>([]);
// 	const ids = ['testing_id1', 'testing_id2'];

// 	const abc = useSelector((state: any) => state.markers);

// 	React.useEffect(() => {
// 		fetchingPositioData();
// 		return () => {
// 			console.log('Unmount');
// 		};
// 	}, []);

// 	// React.useEffect(() => {
// 	// 	console.log('abcd', markers);
// 	// 	// props.markers.map(rr => {
// 	// 	// 	console.log('abcd1', rr);
// 	// 	// });
// 	// 	// console.log('abcd', props.markers);
// 	// });

// 	const fetchingPositioData = async () => {
// 		for (const id of ids) {
// 			const data = await firebase
// 				.database()
// 				.ref(`${UPDATE_USER_COORDS_DATABASE_REF}/${id}`)
// 				.once('value');

// 			const marker = new google.maps.Marker();
// 			marker.setTitle(id);
// 			marker.setPosition({
// 				lat: data.val().lat,
// 				lng: data.val().lng
// 			});

// 			props.updateMarker(marker);
// 			setMarker(abc);
// 			console.log('marker', abc);
// 		}
// 	};

// 	const onClickMarker = (marker: google.maps.Marker) => {
// 		setSelectedMarker(marker);
// 	};

// 	const showPosition = (position: any) => {
// 		if (!myLocation) {
// 			myLocation = new google.maps.Marker();
// 			myLocation.setTitle('My location');
// 			setMyLocation(myLocation);

// 			myLocation.setPosition({
// 				lat: position.coords.latitude,
// 				lng: position.coords.longitude
// 			});

// 			props.updateMarker(myLocation);
// 			console.log('marker', abc);
// 			setMarker(abc);
// 		}

// 		setDataToDatabase(UPDATE_USER_COORDS_DATABASE_REF, 'testing_id', {
// 			lat: position.coords.latitude,
// 			lng: position.coords.longitude
// 		});

// 		props.updateMyLocation(position.coords.latitude, position.coords.longitude);
// 	};

// 	const errorCallback = () => {
// 		alert('aasdasd');
// 	};

// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(showPosition, errorCallback);
// 	} else {
// 		console.log('Geo Location not supported by browser');
// 	}

// 	return (
// 		<>
// 			{markers.map((marker: google.maps.Marker, index: number) => {
// 				console.log(index, marker);
// 				return <MyMarker key={marker.getTitle() || index} marker={marker} onClick={onClickMarker} />;
// 			})}
// 			{selectedMarker && (
// 				<InfoWindow
// 					onCloseClick={() => setSelectedMarker(undefined)}
// 					position={selectedMarker.getPosition() || undefined}>
// 					<div>{selectedMarker.getTitle() || ''}</div>
// 				</InfoWindow>
// 			)}
// 		</>
// 	);
// });

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
// 	updateMyLocation: (lat: number, lng: number) => dispatch(updateMyLocation({ lat, lng })),
// 	updateMarker: (marker: google.maps.Marker) => dispatch(updateMarker(marker))
// });

// const mapStateToProps = (state: AppState): MapStateToPropsType => ({
// 	anonymousUserId: state.anonymousUserId,
// 	markers: state.markers
// });

// export const Markers = connect(mapStateToProps, mapDispatchToProps)(markerListComponent);
