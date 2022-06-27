import { View, Text, Animated, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { height, scale, width } from "../constants/Layout";

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
];

const Onboarding = ({ navigation }: { navigation: any }) => {
  const animatedVal = useRef(new Animated.Value(0)).current;
  const animatedFlatVal = useRef(new Animated.Value(0)).current;
  const [count, setcount] = useState(0);
  const [load, setload] = useState(true);

  useEffect(() => {
    // const int = setInterval(() => {
    //   setcount((value) => {
    //     console.log(value);
    //     if (value === colors.length - 1) {
    //       clearInterval(int);
    //     }
    //     return (value + 1) % colors.length;
    //   });
    // }, 1000);
    //   Animated.loop(
    //     Animated.timing(animatedVal, {
    //       toValue: 1,
    //       useNativeDriver: true,
    //       duration: 1000,
    //     }),
    //     {
    //       resetBeforeIteration: true,
    //       iterations: colors.length,
    //     }
    //   ).start((e) => console.log(e));
  }, []);

  const animate = () => {
    setload(false);
    if (count === colors.length - 1) {
      navigation.goBack();
      return;
    }
    Animated.parallel([
      Animated.timing(animatedFlatVal, {
        toValue: count + 1,
        useNativeDriver: false,
        duration: 800,
      }),
      Animated.timing(animatedVal, {
        toValue: 1,
        useNativeDriver: false,
        duration: 1000,
      }),
    ]).start(() => {
      animatedVal.setValue(0);
      setcount((val: any) => {
        // flatRef?.current?.scrollToIndex({ animated: true, index: val });
        setload(true);
        return val + 1;
      });
    });
  };

  const colors = ["#000000", "#3D0000", "#950101", "#FF0000"];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: colors[count],
      }}
    >
      <Animated.View
        style={{
          //   backgroundColor: animatedVal.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: [colors[count], colors[count + 1]],
          //     extrapolate: "clamp",
          //   }),
          backgroundColor: colors[count + 1],
          width: 20,
          height: 20,
          position: "absolute",
          top: height * 0.3,
          right: -20,
          borderRadius: 10,
          transform: [
            {
              scale: animatedVal.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      />

      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              style={{
                width: width * 2,
                paddingRight: width,
                height: height * 0.7,
                justifyContent: "center",
                alignItems: "center",
                opacity: animatedVal.interpolate({
                  inputRange: [0, 0.1, 0.5, 0.7, 1],
                  outputRange: [1, 0, 0, 1, 1],
                  extrapolate: "clamp",
                }),
                transform: [
                  {
                    translateX: animatedFlatVal.interpolate({
                      inputRange: [count, count + 1],
                      outputRange: [
                        -(count * width) * 2,
                        -((count + 1) * width) * 2,
                      ],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            >
              <Text
                style={{
                  width: width * 0.7,
                  fontSize: scale(24),
                  textAlign: "center",
                  fontWeight: "400",
                  color: "white",
                }}
              >
                {item.quote}
              </Text>
            </Animated.View>
          );
        }}
      />

      <TouchableOpacity onPress={() => load && animate()}>
        <Animated.View
          style={{
            width: scale(72),
            height: scale(72),
            borderRadius: scale(36),
            backgroundColor: "white",
            marginBottom: scale(36),
            opacity: animatedVal.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [1, 0, 0, 1],
              extrapolate: "clamp",
            }),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;
