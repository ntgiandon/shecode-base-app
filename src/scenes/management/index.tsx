import React, {useState, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {getGoogleMapKey} from '~utils';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const ManagementScreen = () => {
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 37.3317876,
      longitude: -122.0054812,
    },
    {
      latitude: 37.771707,
      longitude: -122.4053769,
    },
  ]);
  const mapView = useRef<MapView>(null);

  const onMapPress = (e: MapPressEvent) => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  };

  const renderMarkers = () => {
    return coordinates.map((coordinate, index) => (
      <Marker key={`coordinate_${index}`} coordinate={coordinate} />
    ));
  };

  const renderDirections = () => {
    if (coordinates.length < 2) {
      return null;
    }

    return (
      <MapViewDirections
        origin={coordinates[0]}
        waypoints={
          coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
        }
        destination={coordinates[coordinates.length - 1]}
        apikey={getGoogleMapKey()}
        strokeWidth={3}
        strokeColor="hotpink"
        optimizeWaypoints={true}
        onStart={params => {
          console.log(
            `Started routing between "${params.origin}" and "${params.destination}"`,
          );
        }}
        onReady={result => {
          console.log(`Distance: ${result.distance} km`);
          console.log(`Duration: ${result.duration} min.`);

          mapView.current?.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: width / 20,
              bottom: height / 20,
              left: width / 20,
              top: height / 20,
            },
          });
        }}
        onError={() => {
          console.log('GOT AN ERROR');
        }}
      />
    );
  };

  return (
    <MapView
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={StyleSheet.absoluteFill}
      ref={mapView}
      onPress={onMapPress}>
      {renderMarkers()}
      {/* {renderDirections()} */}
    </MapView>
  );
};
