import * as React from 'react';
import { MyMapComponent } from './components/maps/Maps';
import { Markers } from './components/markers/Markers';
import './App.css';
// import { MarkerProps } from 'google-maps-react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyMapComponent
          defaultZoom={10}
          defaultCenter={{ lat: 47.444, lng: -122.176 }}
        >
          <Markers markers={[]} />
        </MyMapComponent>
      </div>
    );
  }
}

export default App;
