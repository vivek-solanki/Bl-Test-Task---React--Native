import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  Button,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const images = [product.image, product.image, product.image];

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.galleryImage} />
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setModalVisible(true); // Show the modal after adding to cart
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Gallery */}
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageGallery}
        />

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.rating}>★★★★★ 4.5 (200 reviews)</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.offer}>Get 10% off on first purchase</Text>

          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            color="#ff5722"
          />

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Product Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          <View style={styles.sellerContainer}>
            <Text style={styles.sellerTitle}>Sold by:</Text>
            <Text style={styles.sellerName}>Amazing Seller</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Add to Cart Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Item Added to Cart</Text>
            <Text style={styles.modalMessage}>
              The item has been successfully added to your cart.
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageGallery: {
    width: width,
    height: 300,
  },
  galleryImage: {
    width: width,
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#ff9900",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#b12704",
    marginBottom: 8,
  },
  offer: {
    fontSize: 16,
    color: "#007600",
    marginBottom: 16,
  },
  descriptionContainer: {
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
  },
  sellerContainer: {
    marginVertical: 16,
  },
  sellerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sellerName: {
    fontSize: 16,
    color: "#007600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
