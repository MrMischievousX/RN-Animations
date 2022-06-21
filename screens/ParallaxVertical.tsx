import {
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { height, scale, width } from "../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";

const ParallaxVertical = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<any[]>([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=30")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const backgroundColor =
    data.length < 2
      ? "white"
      : scrollY.interpolate({
          inputRange: data.map((_, index) => index * width),
          outputRange: data.map(
            (_, __) => `hsl(${Math.random() * 360},50%,50%)`
          ),
          extrapolate: "clamp",
        });

  const FlatI = ({
    item,
    translate,
    index,
  }: {
    item: any;
    translate: any;
    index: number;
  }) => {
    return (
      <View style={styles.imgContainer}>
        <Animated.View style={{ ...styles.imgAnimate, backgroundColor }}>
          <Animated.Image
            source={{ uri: item.download_url }}
            resizeMode="cover"
            style={{
              ...styles.image,
              transform: [{ translateY: translate }],
            }}
          />
        </Animated.View>
      </View>
    );
  };

  const FlatV = () => {
    return (
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        bouncesZoom
        data={data}
        keyExtractor={(_, index) => _.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item, index }) => {
          const translate = scrollY.interpolate({
            inputRange: [
              (index - 1) * height,
              index * height,
              (index + 1) * height,
            ],
            outputRange: [-scale(240), 0, scale(240)],
            extrapolate: "clamp",
          });

          return <FlatI item={item} translate={translate} index={index} />;
        }}
      />
    );
  };

  return (
    <Animated.View style={{ ...styles.main, backgroundColor }}>
      {data.length < 1 ? (
        <ActivityIndicator size="large" color={"white"} />
      ) : (
        <FlatV />
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={1}
        style={styles.back}
      >
        <Ionicons name="chevron-back-outline" size={scale(28)} color="black" />
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
  },
  imgContainer: {
    height: height,
    width: width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  imgAnimate: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(260),
    height: scale(420),
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: scale(24),
  },
  image: {
    width: scale(240),
    height: scale(400),
    borderRadius: scale(18),
  },
});

export default ParallaxVertical;
