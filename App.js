import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CreditCardList from "./src/Screen/CardList";

export default function App() {
  return <CreditCardList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
