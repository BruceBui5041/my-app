import * as React from 'react';
import { Marker } from 'react-google-maps';

interface CustomMarkerProps {
  markers: google.maps.Marker[];
}

export const Markers = React.memo((props: CustomMarkerProps) => {
  const marker: google.maps.Marker = new google.maps.Marker();
  marker.setPosition({ lat: 47.677, lng: -122.166 });
  marker.setTitle('Khoa oc cho');

  const marker1: google.maps.Marker = new google.maps.Marker();
  marker1.setPosition({ lat: 47.277, lng: -122.266 });
  marker1.setTitle('Khoa oc cho 3');

  const [testingArray, setTestingArray] = React.useState([marker, marker1]);

  const onClickMarker = (marker: google.maps.Marker) => {
    marker.setPosition({
      lat: 47.477,
      lng: -122.066
    });

    setTestingArray([...testingArray, marker]);
  };

  return (
    <>
      {testingArray.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={marker.getPosition() || null || undefined}
            title={marker.getTitle() || ''}
            onClick={() => {
              onClickMarker(marker);
            }}
          />
        );
      })}

      {/* <InfoWindow onCloseClick={() => setSelectedMarker(null)} position={selectedMarker.position}>
        <div>{JSON.stringify(selectedMarker)}</div>
      </InfoWindow> */}
    </>
  );
});
