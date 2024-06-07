import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";


const MapScreen = () => {
  return (
    <View>
      {/*Map */}
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        {/* <Stack.Navigator></Stack.Navigator> */}
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});

