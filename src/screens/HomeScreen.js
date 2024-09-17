import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchProducts } from "../utils/api";
import { useSelector } from "react-redux";
import Product from "../components/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [productIds, setProductIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItemCount = useSelector((state) => state.cart.items.length);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProductIds(products.map((product) => product.id));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error clearing token from AsyncStorage:", error);
      Alert.alert(
        "Logout Error",
        "There was an error logging out. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require("../../assets/images/logo.png")} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "20%",
            }}
          >
            <TouchableOpacity
              style={styles.cartIconContainer}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart-outline" size={24} color="gray" />
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartIconContainer}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product List with Two Cards per Row */}
        <FlatList
          data={productIds}
          renderItem={({ item }) => (
            <Product
              productId={item}
              onPress={(product) =>
                navigation.navigate("ProductDetails", { product })
              }
            />
          )}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          key={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.productListContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  cartIconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#ff5722",
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  productListContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
