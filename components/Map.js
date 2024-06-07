import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from "../src/redux/slices/navSlice.js";
import MapViewDirections from "react-native-maps-directions";
// import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export default function Map() {
  const origin = useSelector(selectOrigin); //get my location origin
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  //getTravelTime
  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=AIzaSyAbSGVQaQwLRNS9qx6DAj0fHDkyMW9Se24`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination]);

  if (!origin) {
    Alert.alert("Ops!", "Informe a origem antes de prosseguir!");

    navigation.goBack();
  }

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin ? origin.location.lat : 0,
        longitude: origin ? origin.location.lng : 0,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      }}
    >
      {/*Render when there is both origin & destination*/}
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={"AIzaSyAbSGVQaQwLRNS9qx6DAj0fHDkyMW9Se24"}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {/*Render when there is origin location alone */}
      {origin?.location && (
        <Marker
          coordinate={{
            //latitude & longitude from the origin
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {/*Render when there is destination & destination location */}
      {destination && destination.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Destination"
          description={origin.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
}
