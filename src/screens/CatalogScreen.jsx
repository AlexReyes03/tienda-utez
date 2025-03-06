import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { Card, Button } from "@rneui/base";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConnection";

export default function CatalogScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando Productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Precio: ${item.price}</Text>
            <Text style={styles.stock}>Stock: {item.stock} unidades</Text>
            <Button title="Agregar al carrito" onPress={() => {}} buttonStyle={styles.button} />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { flex: 1, margin: 5, borderRadius: 10, padding: 15 },
  name: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  price: { fontSize: 14, color: "green", textAlign: "center" },
  stock: { fontSize: 12, color: "gray", textAlign: "center", marginBottom: 10 },
  productImage: { width: "100%", height: 100, borderRadius: 10, resizeMode: "cover" },
  button: { borderRadius: 10, backgroundColor: "#109075" },
});