import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { fetchProductById } from "../utils/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Product = ({ productId, onPress }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onPress(product)}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={1}>
        {product.title}
      </Text>
      <Text style={styles.discountText}>${product.price}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} color="#45484A" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: "47%",
  },
  productImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  discountText: {
    color: "green",
    fontSize: 14,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Product;
