import * as React from 'react';
import * as firebase from 'firebase';
import { Marker, InfoWindow } from 'react-google-maps';

interface CustomMarkerProps {
  markers: google.maps.Marker[];
}

export const Markers = React.memo((props: CustomMarkerProps) => {
  const [selectedMarker, setSelectedMarker] = React.useState<
    google.maps.Marker
  >();

  firebase
    .database()
    .ref('abc')
    .on('child_changed', snapshot => {
      console.log(snapshot.val());
    });

  const onClickMarker = (marker: google.maps.Marker) => {
    setSelectedMarker(marker);
  };

  React.useEffect(() => {
    return () => {
      firebase
        .database()
        .ref('abc')
        .off();
    };
  });

  return (
    <>
      {props.markers.map((marker, index) => {
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
      {selectedMarker && (
        <InfoWindow
          onCloseClick={() => setSelectedMarker(undefined)}
          position={selectedMarker.getPosition() || null || undefined}
        >
          <div>{selectedMarker.getTitle() || ''}</div>
        </InfoWindow>
      )}
    </>
  );
});
