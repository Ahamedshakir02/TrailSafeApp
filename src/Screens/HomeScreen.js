import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddDeviceModalVisible, setAddDeviceModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const toggleProfileModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleAddDeviceModal = () => {
    setAddDeviceModalVisible(!isAddDeviceModalVisible);
  };

  const handleAddDevice = () => {
    if (newDeviceName.trim()) {
      setDevices([...devices, { id: Date.now().toString(), name: newDeviceName }]);
      setNewDeviceName("");
      toggleAddDeviceModal();
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    auth.signOut();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
        <TouchableOpacity onPress={toggleProfileModal}>
          <Image
            source={{
              uri: user?.photoURL || "https://via.placeholder.com/150", // Default profile picture
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search devices..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Device Cards */}
      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noDevicesText}>
            {searchQuery ? "No devices found" : "No devices added"}
          </Text>
        }
      />

      {/* Add Device Button */}
      <TouchableOpacity style={styles.addDeviceButton} onPress={toggleAddDeviceModal}>
        <Text style={styles.addDeviceText}>+</Text>
      </TouchableOpacity>

      {/* Profile Menu Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleProfileModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: user?.photoURL || "https://via.placeholder.com/150",
              }}
              style={styles.modalProfileImage}
            />
            <Text style={styles.userName}>{user?.displayName || "User"}</Text>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                toggleProfileModal();
                navigation.navigate("Profile"); // Navigate to ProfileScreen
              }}
            >
              <Text style={styles.menuText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                toggleProfileModal();
                navigation.navigate("Settings"); // Navigate to Settings (if implemented)
              }}
            >
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={handleLogout}>
              <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Device Modal */}
      <Modal
        transparent={true}
        visible={isAddDeviceModalVisible}
        animationType="fade"
        onRequestClose={toggleAddDeviceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addDeviceModalContent}>
            <Text style={styles.addDeviceTitle}>Add New Device</Text>
            <TextInput
              style={styles.deviceInput}
              placeholder="Enter device name"
              value={newDeviceName}
              onChangeText={setNewDeviceName}
            />
            <TouchableOpacity style={styles.addDeviceButtonModal} onPress={handleAddDevice}>
              <Text style={styles.addDeviceButtonText}>Add Device</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  searchBar: {
    marginHorizontal: 20,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  deviceCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  deviceName: { fontSize: 16 },
  noDevicesText: { textAlign: "center", color: "gray", marginTop: 20 },
  addDeviceButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
  },
  addDeviceText: { fontSize: 30, color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalProfileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  menuOption: { paddingVertical: 10, width: "100%", alignItems: "center" },
  menuText: { fontSize: 16 },
  addDeviceModalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  addDeviceTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  deviceInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addDeviceButtonModal: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addDeviceButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
