import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from "../src/redux/slices/navSlice.js";
// import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { GOOGLE_MAPS_APIKEY } from '@env';

export default function Map() {
  const origin = useSelector(selectOrigin); //get my location origin
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  //To Zoom Map
  const mapRef = useRef(null); 

  useEffect(() => {
    if (!origin || !destination) return;
    //zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], 
      {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  //Distance Matrix API - calculate TravelTime function
  useEffect(() => {
    if (!origin || !destination) return;
    //Get Request - Fetch Info from Google Distance Matrix API
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //dispatch to redux store
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };


    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  if (!origin) {
    Alert.alert("Ops!", "Informe a origem antes de prosseguir!");

    navigation.goBack();
  }


  return (
    <MapView
      ref={mapRef} //useRef hook To Zoom Map
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
          apikey={GOOGLE_MAPS_APIKEY}
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
