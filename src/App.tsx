import * as React from 'react';
import { MyMapComponent } from './components/maps/Maps';
import { Markers } from './components/markers/Markers';
import * as firebase from 'firebase';
import './App.css';
// import { MarkerProps } from 'google-maps-react';

interface AppState {
  markers: google.maps.Marker[];
}

const Marker = google.maps.Marker;

class App extends React.Component<any, AppState> {
  watchLocationID: any;
  myLocation: google.maps.Marker;

  constructor(props: any) {
    super(props);
    const marker: google.maps.Marker = new Marker();
    marker.setPosition({ lat: 47.677, lng: -122.166 });
    marker.setTitle('Khoa oc cho');

    const marker1: google.maps.Marker = new Marker();
    marker1.setPosition({ lat: 47.277, lng: -122.266 });
    marker1.setTitle('Khoa oc cho 3');

    this.state = { markers: [marker, marker1] };
  }

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

    if (navigator.geolocation) {
      this.watchLocationID = navigator.geolocation.watchPosition(
        this.showPosition
      );
    } else {
      console.log('Geo Location not supported by browser');
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchLocationID);
  }

  showPosition = (position: any) => {
    if (!this.myLocation) {
      this.myLocation = new Marker();
      this.myLocation.setTitle('My location');
      this.setState({ markers: [...this.state.markers, this.myLocation] });
    }

    this.myLocation.setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });

    console.log(this.state.markers.length);
    console.log(location);
  };

  render() {
    return (
      <div className="App">
        <MyMapComponent
          defaultZoom={10}
          defaultCenter={{ lat: 47.444, lng: -122.176 }}
        >
          <Markers markers={this.state.markers} />
        </MyMapComponent>
      </div>
    );
  }
}

export default App;
