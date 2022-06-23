import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scale, isSmallDevice } from "../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";

const SlowLoading = ({ navigation }: { navigation: any }) => {
  const animateMainText = useRef(new Animated.Value(scale(320))).current;
  const animateSubText = useRef(new Animated.Value(scale(340))).current;
  const animateButton = useRef(new Animated.Value(scale(0))).current;

  const animate = () => {
    Animated.timing(animateButton, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const XY = [
    { x: scale(90), y: scale(80), size: scale(80) },
    { x: scale(100), y: scale(-40), size: scale(60) },
    { x: scale(-100), y: scale(70), size: scale(90) },
    { x: scale(-10), y: scale(110), size: scale(48) },
    { x: scale(-100), y: scale(-70), size: scale(68) },
    { x: scale(0), y: scale(0), size: scale(120) },
    { x: scale(20), y: scale(-110), size: scale(56) },
  ];

  const imgAnimateArr = XY.map((item, index) => {
    // return new Animated.ValueXY({ x: item.x, y: item.y });
    return useRef(
      new Animated.ValueXY({
        x: item.x * 10,
        y: item.y * 10,
      })
    ).current;
  });
  const imgAnimateS = XY.map((item, index) => {
    return new Animated.Value(0);
  });

  useEffect(() => {
    const imgAnimations = XY.map((item, index) => {
      return Animated.timing(imgAnimateArr[index], {
        toValue: { x: item.x, y: item.y },
        useNativeDriver: true,
        duration: 1600,
        easing: Easing.bezier(0.215, 0.61, 0.355, 1.0),
      });
    });
    const imgAnimationsS = XY.map((item, index) => {
      return Animated.timing(imgAnimateS[index], {
        toValue: 1,
        useNativeDriver: true,
        duration: 1000,
        easing: Easing.bezier(0.215, 0.61, 0.355, 1.0),
      });
    });

    Animated.parallel([...imgAnimations, ...imgAnimationsS]).start(() => {
      Animated.stagger(0, [
        Animated.timing(animateMainText, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(animateSubText, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        animate();
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        {XY.map((item, index) => {
          return (
            <Animated.Image
              key={index}
              source={{ uri: `https://picsum.photos/200` }}
              style={{
                width: item.size,
                height: item.size,
                position: "absolute",
                resizeMode: "contain",
                backgroundColor: "transparent",
                borderRadius: item.size,
                transform: [
                  { translateX: imgAnimateArr[index].x },
                  { translateY: imgAnimateArr[index].y },
                  { scale: imgAnimateS[index] },
                ],
              }}
            />
          );
        })}
      </View>
      <Animated.Text
        style={{
          ...styles.mainText,
          transform: [{ translateY: animateMainText }],
        }}
      >
        Slow Loading Animation
      </Animated.Text>
      <Animated.Text
        style={{
          ...styles.subText,
          transform: [{ translateY: animateSubText }],
        }}
      >
        Made by using Animated api and Easing functions
      </Animated.Text>
      <Animated.View
        style={{
          ...styles.circleContainer,
          opacity: animateButton,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Animated.View
            style={{ ...styles.circle, transform: [{ scale: animateButton }] }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={scale(28)}
              color="black"
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    width: scale(320),
    height: scale(320),
    backgroundColor: "yellow",
    alignSelf: "center",
    marginTop: scale(8),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mainText: {
    fontSize: isSmallDevice ? scale(28) : scale(36),
    alignSelf: "center",
    marginTop: isSmallDevice ? scale(42) : scale(74),
    width: scale(240),
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  subText: {
    fontSize: scale(16),
    alignSelf: "center",
    marginTop: scale(16),
    width: scale(240),
    textAlign: "center",
    color: "white",
    opacity: 0.6,
  },
  circleContainer: {
    width: isSmallDevice ? scale(72) : scale(86),
    height: isSmallDevice ? scale(72) : scale(86),
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: scale(28),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(43),
    borderWidth: scale(2),
    borderColor: "lightyellow",
  },
  circle: {
    width: isSmallDevice ? scale(44) : scale(52),
    height: isSmallDevice ? scale(44) : scale(52),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(42),
  },
});

export default SlowLoading;

{
  /* <Animated.Image
          source={require("../assets/icon.png")}
          style={{
            width: scale(64),
            height: scale(64),
            transform: [
              { translateX: animateImg1.x },
              { translateY: animateImg1.y },
            ],
          }}
        /> */
}
