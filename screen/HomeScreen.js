import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../src/redux/slices/navSlice";

//console.log({GOOGLE_MAPS_APIKEY})

const HomeScreen = () => {
  const dispatch = useDispatch();

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

        {/*Search Bar */}
        <GooglePlacesAutocomplete
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400} //execute search after 400milliseconds
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
          onPress={(data, details = null) => {
            console.log("Data: ", data);
            console.log("Details: ", details);
            // Dispatch Action; origin or starting point to redux store
            if (details) {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              // Dispatch Action; destination to redux store
              dispatch(setDestination(null));
            }
          }}
          fetchDetails={true} //details includes geometry locations, coordinates etc
        />
      </View>

      {/*Navigation */}
      <NavOptions />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
});


