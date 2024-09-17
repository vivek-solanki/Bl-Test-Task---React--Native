import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import LottieView from 'lottie-react-native'; // Import LottieView

const { width } = Dimensions.get("window");

const CheckoutScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const handleConfirmOrder = () => {
    setModalVisible(true);
  };

  const handleConfirmModal = () => {
    dispatch(clearCart());
    setModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
        <Text style={styles.paymentMethod}>
          Payment Method: Cash on Delivery
        </Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for order confirmation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={require('../../assets/success-animation.json')}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            />
            <Text style={styles.modalTitle}>Order Successful</Text>
            <Text style={styles.modalMessage}>
              Thank you so much for your order!
            </Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleConfirmModal}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 80, // Space for footer
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#555",
  },
  itemPrice: {
    fontSize: 14,
    color: "#ff5722",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 3,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },
  lottieAnimation: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalConfirmButton: {
    backgroundColor: "#ff5722",
  },
  modalCancelButton: {
    backgroundColor: "#ddd",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
