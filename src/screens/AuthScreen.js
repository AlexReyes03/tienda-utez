import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import AuthSwitcher from "../components/AuthSwitcher";

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <View style={styles.container}>
      <AuthForm isLogin={isLogin} navigation={navigation} /> {/* <-- Pasa navigation a AuthForm */}
      <AuthSwitcher isLogin={isLogin} setIsLogin={setIsLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }
});
