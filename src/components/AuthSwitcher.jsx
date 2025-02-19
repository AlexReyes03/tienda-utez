import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function AuthSwitcher({ isLogin, setIsLogin }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>{isLogin ? "Crear cuenta" : "Ya tengo cuenta, Iniciar Sesión"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: "center" },
  switchText: { color: "#1e3d74", textAlign: "center" }
});
