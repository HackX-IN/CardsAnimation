import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  Modal,
  PanResponder,
  TouchableOpacity,
  Image,
} from "react-native";
import CreditCardModal from "../components/CreditCardModel";
import { Cards } from "../utils/DummyData";

const CreditCardList = () => {
  const generateRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#5733FF",
      "#FF33F3",
      "#33E4FF",
      "#33FF99",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [data, setData] = useState(Cards);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const closeModal = () => {
    setSelectedCard(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/creditcards");

        const data = await response.data;
        setData(data);
        console.log("Data fetched successfully:");
      } catch (err) {
        console.log("Error fetching data:", err.message);
      }
    };

    getData();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        const newIndex = Math.floor(-dy / (CARD_HEIGHT * 0.5));

        if (newIndex >= 0 && newIndex < data.length) {
          flatListRef.scrollToIndex({ index: newIndex });
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/11378/11378185.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.slogan}>Cards</Text>
      </View>
      <FlatList
        ref={(ref) => (flatListRef = ref)}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const translateY = new Animated.Value(index * CARD_HEIGHT * -0.5);
          const cardColor = generateRandomColor();
          const rotateY = new Animated.Value(0);

          const cardStyle = {
            transform: [
              { translateY },
              { perspective: 1000 },
              {
                rotateX: translateY.interpolate({
                  inputRange: [-CARD_HEIGHT, 0, CARD_HEIGHT],
                  outputRange: ["-30deg", "0deg", "30deg"],
                  extrapolate: "clamp",
                }),
              },
              {
                rotateY: rotateY.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ["-45deg", "45deg"],
                  extrapolate: "clamp",
                }),
              },
            ],
            backgroundColor: cardColor,
            zIndex: data.length - index,
          };

          return (
            <Animated.View
              style={[styles.cardContainer, cardStyle]}
              onTouchEnd={() => {
                setSelectedCard(item);
                setModalVisible(true);
                Animated.parallel([
                  Animated.spring(translateY, {
                    toValue: index * CARD_HEIGHT * -0.5,
                    useNativeDriver: true,
                  }),
                  Animated.spring(rotateY, {
                    toValue: 0,
                    useNativeDriver: true,
                  }),
                ]).start();
              }}
            >
              <View style={styles.cardInfo}>
                <Text style={styles.cardNumber}>{item.cardNumber}</Text>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardExpiry}>{item.expiry}</Text>

                <Text style={styles.cardCvv}>{item.cvv}</Text>
              </View>
            </Animated.View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <CreditCardModal selectedCard={selectedCard} closeModal={closeModal} />
      </Modal>
    </View>
  );
};
const CARD_HEIGHT = 180;
const CARD_WIDTH = 300;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  slogan: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "bold",
    color: "#666",
  },
  cardExpiry: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
  },
  cardCvv: {
    fontSize: 14,
    color: "#fff",
  },

  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#fff",
  },
  cardName: {
    fontSize: 14,
    color: "#fff",
  },
});
export default CreditCardList;
