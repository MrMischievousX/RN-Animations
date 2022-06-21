import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { scale } from "./constants/Layout";
import ParallaxHorizontal from "./screens/ParallaxHorizontal";
import ParallaxVertical from "./screens/ParallaxVertical";

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: scale(24), fontWeight: "500" }}>Animations</Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(24) }}
        onPress={() => {
          navigation.navigate("ParallaxHorizontal");
        }}
      >
        Horizontal Parallax Effect
      </Text>
      <Text
        style={{ fontSize: scale(18), marginTop: scale(12) }}
        onPress={() => {
          navigation.navigate("ParallaxVertical");
        }}
      >
        Vertical Parallax Effect
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
        <Stack.Screen name="Profile" component={HomeScreen} />
        <Stack.Screen name="Settings" component={HomeScreen} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
