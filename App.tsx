import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { scale } from "./constants/Layout";
import BackgroundChange from "./screens/BackgroundChange";
import CarouselZoom from "./screens/CarouselZoom";
import ParallaxHorizontal from "./screens/ParallaxHorizontal";
import ParallaxVertical from "./screens/ParallaxVertical";
import SlowLoading from "./screens/SlowLoading";

function HomeScreen({ navigation }: { navigation: any }) {
  const nav = navigation.navigate;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: scale(24), fontWeight: "500" }}>Animations</Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(24) }}
        onPress={() => {
          nav("ParallaxHorizontal");
        }}
      >
        Horizontal Parallax Effect
      </Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(12) }}
        onPress={() => {
          nav("ParallaxVertical");
        }}
      >
        Vertical Parallax Effect
      </Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(12) }}
        onPress={() => {
          nav("CarouselZoom");
        }}
      >
        Carousel Zoom Effect
      </Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(12) }}
        onPress={() => {
          nav("BackgroundChange");
        }}
      >
        Background Change Blur Effect
      </Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(12) }}
        onPress={() => {
          nav("SlowLoading");
        }}
      >
        Slow Loading Effect
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ParallaxHorizontal"
          component={ParallaxHorizontal}
        />
        <Stack.Screen name="ParallaxVertical" component={ParallaxVertical} />
        <Stack.Screen name="CarouselZoom" component={CarouselZoom} />
        <Stack.Screen name="BackgroundChange" component={BackgroundChange} />
        <Stack.Screen name="SlowLoading" component={SlowLoading} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
