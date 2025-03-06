import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Button } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ProfileScreen({ navigation }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          name: authUser.displayName || "Erick Mireles",
          email: authUser.email,
          phone: "+52 123 456 7890",
          address: "Palo Escrito 123, Morelos",
          profilePic: authUser.photoURL || "https://randomuser.me/api/portraits/men/73.jpg"
        });
      } else {
        setUser(null);
        navigation.navigate("Auth");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate("Auth");
    });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.profilePic }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>📧 {user.email}</Text>
          <Text style={styles.info}>📞 {user.phone}</Text>
          <Text style={styles.info}>🏠 {user.address}</Text>
          <Button 
            title="Cerrar Sesión" 
            onPress={handleLogout} 
            buttonStyle={styles.button} 
            titleStyle={styles.buttonText} 
            containerStyle={styles.buttonContainer}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 20 },
  card: { width: "90%", borderRadius: 15, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5, alignItems: "center" },
  profileContainer: { alignItems: "center" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  info: { fontSize: 16, color: "gray", marginBottom: 5, textAlign: "center" },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  button: { 
    marginTop: 15, 
    borderRadius: 10, 
    backgroundColor: "#1e3d74", 
    width: "80%", 
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 10
  },
  buttonText: { 
    textAlign: "center", 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "white" 
  }
});
