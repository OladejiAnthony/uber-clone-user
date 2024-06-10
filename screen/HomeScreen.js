import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../src/redux/slices/navSlice";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handlePress = (data, details = null) => {
    console.log("Data: ", data);
    console.log("Details: ", details);
    if (details) {
      dispatch(
        setOrigin({
          location: details.geometry.location,
          description: data.description,
        })
      );
      dispatch(setDestination(null));
    } else {
      Alert.alert("Details not available", "No location details found.");
    }
  };

  const handleError = (error) => {
    console.error("Error: ", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />

        {/* Search Bar */}
        <GooglePlacesAutocomplete
          placeholder="Where From?"
          //nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400} // Execute search after 400 milliseconds
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          onPress={handlePress}
          fetchDetails={true} // Details includes geometry locations, coordinates, etc.
          onFail={handleError}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          GooglePlacesDetailsQuery={{
            fields: "geometry",
          }}
          listViewDisplayed="auto"
          nearbyPlacesAPI="GoogleReverseGeocoding"
          filterReverseGeocodingByTypes={["locality", "administrative_area_level_3"]}
        />
      </View>

      {/* Navigation */}
      <NavOptions />
      <NavFavorites  />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
});
