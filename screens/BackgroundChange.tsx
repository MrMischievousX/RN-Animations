import {
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { height, scale, width } from "../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackgroundChange = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<any[]>([]);

  const scroll = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // fetch("https://picsum.photos/v2/list?page=2&limit=30")
    //   .then((res) => res.json())
    //   .then((res) => setData(res));
    const data = [
      "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
    ];
    setTimeout(() => {
      setData(data);
    }, 500);
  }, []);

  const FlatI = ({ item, index }: { item: any; index: number }) => {
    const uri = item;

    return (
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri,
          }}
          resizeMode="cover"
          style={{
            ...styles.image,
          }}
        />
      </View>
    );
  };

  const FlatB = () => {
    return (
      <>
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((item, index) => {
            const opacity = scroll.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            });
            return (
              <Animated.Image
                source={{ uri: item }}
                key={index}
                blurRadius={50}
                resizeMode="cover"
                style={{ ...StyleSheet.absoluteFillObject, opacity: opacity }}
              />
            );
          })}
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scroll } } }],
            { useNativeDriver: true }
          )}
          bouncesZoom
          data={data}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({ item, index }) => {
            return <FlatI item={item} index={index} />;
          }}
        />
      </>
    );
  };

  return (
    <Animated.View style={{ ...styles.main }}>
      {data.length < 1 ? (
        <ActivityIndicator size="large" color={"red"} />
      ) : (
        <FlatB />
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={1}
        style={styles.back}
      >
        <Ionicons name="chevron-back-outline" size={scale(28)} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: scale(32),
    left: scale(16),
    zIndex: 100000,
  },
  imgContainer: {
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 28,
    shadowColor: "black",
  },
  image: {
    width: scale(240),
    height: scale(400),
    borderRadius: scale(12),
  },
});

export default BackgroundChange;
