import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { height, scale, width } from "../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const data = [
  {
    quote:
      "For the things we have to learn before we can do them, we learn by doing them.",
    author: "Aristotle, The Nicomachean Ethics",
    color: "red",
  },
  {
    quote: "The fastest way to build an app.",
    author: "The Expo Team",
    color: "blue",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    color: "green",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    color: "orange",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    color: "red",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
    color: "blue",
  },
  {
    quote: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey",
    color: "green",
  },
  {
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron",
    color: "orange",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    color: "pink",
  },
];

const length = data.length;

const AnimatedOnboarding = ({ navigation }: { navigation: any }) => {
  const [index, setIndex] = useState<number>(0);
  const animatedVal = useRef(new Animated.Value(0)).current;
  const animatedText = useRef(new Animated.Value(0)).current;

  const animate = (i: any) => {
    Animated.parallel([
      Animated.timing(animatedText, {
        toValue: (index + 1) % length,
        duration: 1050,
        useNativeDriver: false,
      }),
      Animated.timing(animatedVal, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (index == length - 2) {
        navigation.goBack();
        // setIndex(0);
      } else {
        setIndex(index + 1);
      }
      animatedVal.setValue(0);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: animatedVal.interpolate({
            inputRange: [0, 0.001, 0.5, 0.501, 1],
            extrapolate: "clamp",
            outputRange: [
              data[index].color,
              data[index].color,
              data[index].color,
              data[(index + 1) % length].color,
              data[(index + 1) % length].color,
            ],
          }),
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            width: "auto",
            height: "auto",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            opacity: animatedVal.interpolate({
              inputRange: [0, 0.001, 0.16, 0.6, 0.7, 1],
              outputRange: [1, 1, 0, 0, 1, 1],
              extrapolate: "clamp",
            }),
            transform: [
              // {
              //   scale: animatedVal.interpolate({
              //     extrapolate: "clamp",
              //     inputRange: [0, 0.01, 0.5, 0.501, 1],
              //     outputRange: [1, 0.95, 0, 0.8, 1],
              //   }),
              // },
              {
                translateX: animatedText.interpolate({
                  extrapolate: "clamp",
                  inputRange: [...Array(data.length).keys()],
                  outputRange: [...data.map((_, i) => -i * width * 2)],
                }),
              },
            ],
          }}
        >
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: width * 2,
                  height: height * 0.8,
                  justifyContent: "center",
                  paddingLeft: width * 0.1,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: scale(24),
                    width: width * 0.8,
                    textAlign: "center",
                    marginBottom: scale(24),
                  }}
                >
                  {item.quote}
                </Text>
                <Image
                  source={{ uri: "https://picsum.photos/800" }}
                  style={{
                    width: width * 0.8,
                    height: width * 0.8,
                    borderRadius: scale(24),
                  }}
                />
              </View>
            );
          })}
        </Animated.View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            animate(index);
          }}
          style={{
            position: "absolute",
            bottom: scale(72),
            alignSelf: "center",
          }}
        >
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: scale(72),
              height: scale(72),
              backgroundColor: animatedVal.interpolate({
                extrapolate: "clamp",
                inputRange: [0, 0.001, 0.5, 0.501, 0.999, 1],
                outputRange: [
                  data[(index + 1) % length].color,
                  data[(index + 1) % length].color,
                  data[(index + 1) % length].color,
                  data[index % length].color,
                  data[index % length].color,
                  data[(index + 2) % length].color,
                ],
              }),
              flex: 1,
              borderRadius: scale(36),
              transform: [
                {
                  perspective: 200,
                },
                {
                  rotateY: animatedVal.interpolate({
                    extrapolate: "clamp",
                    inputRange: [0, 0.5, 1],
                    outputRange: ["0deg", "-90deg", "-180deg"],
                  }),
                },
                {
                  scale: animatedVal.interpolate({
                    extrapolate: "clamp",
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 8, 1],
                  }),
                },
                {
                  translateX: animatedVal.interpolate({
                    extrapolate: "clamp",
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, scale(36), 0],
                  }),
                },
              ],
            }}
          >
            <AnimatedIonicons
              name="chevron-forward-outline"
              size={scale(28)}
              color="white"
              style={{
                opacity: animatedVal.interpolate({
                  inputRange: [0, 0.1, 0.4, 0.6, 0.9, 1],
                  outputRange: [1, 0, 0, 0, 0, 1],
                }),
                transform: [
                  {
                    rotateY: animatedVal.interpolate({
                      extrapolate: "clamp",
                      inputRange: [0, 0.5, 1],
                      outputRange: ["0deg", "-90deg", "-180deg"],
                    }),
                  },
                ],
              }}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AnimatedOnboarding;
