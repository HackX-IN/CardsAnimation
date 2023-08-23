import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CreditCardModal = ({ selectedCard, closeModal }) => {
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
  return (
    <View style={styles.modalContainer}>
      {selectedCard && (
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: generateRandomColor(),
              width: 300,
              height: 180,
              padding: 24,
            },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalCardNumber}>
              {selectedCard.cardNumber}
            </Text>
            <Text style={styles.modalCardName}>{selectedCard.name}</Text>
            <Text style={styles.modalCardExpiry}>
              Expiry: {selectedCard.expiry}
            </Text>
            <Text style={styles.modalCardCvv}>CVV: {selectedCard.cvv}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalCardExpiry: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalCardCvv: {
    fontSize: 16,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCardNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalCardName: {
    fontSize: 16,
    color: "#666",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreditCardModal;
