import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { getAuth } from "firebase/auth";

export default function ProfileScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate("Auth");
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.photoURL || "https://randomuser.me/api/portraits/men/73.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{user?.email || "Usuario Anónimo"}</Text>
      <View style={styles.bottomContainer}>
        <Button title="Cerrar Sesión" color={'#1e3d74'} onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  username: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  bottomContainer: { position: "absolute", bottom: 20, width: "100%", paddingHorizontal: 20, borderRadius: 10 }
});
