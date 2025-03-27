import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AlertsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alerts & History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AlertsScreen;
