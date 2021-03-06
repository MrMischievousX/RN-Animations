import {
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { height, scale, width } from "../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";

// "https://images.unsplash.com/photo-1655743851261-4805d5104cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",

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
          inputRange: data.map((_, index) => index * height),
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
    const uri = `https://picsum.photos/200/30${0 + (index % 9)}`;

    return (
      <View style={styles.imgContainer}>
        <View style={styles.shadow}>
          <Animated.View
            style={{ ...styles.imgAnimate, borderColor: backgroundColor }}
          >
            <Animated.Image
              source={{
                uri,
              }}
              resizeMode="cover"
              style={{
                ...styles.image,
                transform: [{ translateY: translate }],
              }}
            />
          </Animated.View>
        </View>
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
        data={data}
        keyExtractor={(_, index) => _.id}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item, index }) => {
          const translate = scrollY.interpolate({
            inputRange: [
              (index - 1) * height,
              index * height,
              (index + 1) * height,
            ],
            outputRange: [-scale(400), 0, scale(400)],
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
    justifyContent: "center",
    alignItems: "center",
  },
  imgAnimate: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: scale(24),
    borderWidth: scale(12),
  },
  image: {
    width: scale(240),
    height: scale(400),
    borderRadius: scale(12),
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 28,
    shadowColor: "black",
  },
});

export default ParallaxVertical;
