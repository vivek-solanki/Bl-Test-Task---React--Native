import React, { useEffect, useState } from "react"; 
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, Image as RNImage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";


const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();


  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 0 && quantity <= 10) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleIncrement = (id, currentQuantity) => {
    if (currentQuantity < 10) {
      dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
    }
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrement(item.id, item.quantity)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={(text) => handleQuantityChange(item.id, parseInt(text, 10))}
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrement(item.id, item.quantity)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => dispatch(removeFromCart(item))}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <RNImage
            source={{ uri: "https://bakestudio.in/assets/images/cart/empty-cart.gif" }}
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.footer}>
            <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    marginTop: 16,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 120,
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
  itemPrice: {
    fontSize: 14,
    color: "#ff5722",
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    width: 60,
    textAlign: "center",
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: "#ff5722",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
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
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartImage: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  shopNowButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 150,
  },
  shopNowButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendedContainer: {
    marginTop: 20,
  },
  recommendedTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendedList: {
    marginBottom: 20,
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginRight: 10,
    overflow: "hidden",
    width: 120,
    height: "30%",
    alignItems: "center",
    padding: 10,
  },
  recommendedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default CartScreen;
