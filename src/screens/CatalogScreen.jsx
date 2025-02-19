import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Card, Button } from "@rneui/base";

const products = [
  { id: "1", image: "https://via.placeholder.com/300x150", name: "Producto 1", price: 100, stock: 10 },
  { id: "2", image: "https://via.placeholder.com/300x150", name: "Producto 2", price: 200, stock: 5 },
  { id: "3", image: "https://via.placeholder.com/300x150", name: "Producto 3", price: 150, stock: 8 },
  { id: "4", image: "https://via.placeholder.com/300x150", name: "Producto 4", price: 250, stock: 3 },
];

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            {/* Se corrigió la estructura del source */}
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Precio: ${item.price}</Text>
            <Text style={styles.stock}>Stock: {item.stock} unidades</Text>
            <Button title="🛒 Agregar al carrito" onPress={() => {}} buttonStyle={styles.button} />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  card: { borderRadius: 10, padding: 15, shadowColor: "#000" },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "green" },
  stock: { fontSize: 14, color: "gray", marginBottom: 10 },
  productImage: { width: "100%", height: 150, borderRadius: 10, marginBottom: 10, resizeMode: "cover" },
  button: { borderRadius: 10, backgroundColor: "#109075" }
});
