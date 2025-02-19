import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Input, Button, Icon, Card } from "@rneui/base";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const { width } = Dimensions.get("window");

export default function AuthForm({ isLogin, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const auth = getAuth();

  const handleAuth = async () => {
    setError("");
    if (!email || !password || (!isLogin && password !== password2)) {
      setError("Complete los campos correctamente");
      return;
    }

    try {
      if (isLogin) {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log("Inicio de sesión exitoso", response);
        navigation.navigate("Profile");
      } else {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Cuenta creada e iniciando sesión", response);
        navigation.navigate("Profile");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.innerContainer}>
      <Card containerStyle={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: "https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/302182027_429507355914277_5683995294210034468_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=J4OOxfsp_dsQ7kNvgGRFLdH&_nc_oc=AdjU01ufJdIOV6LIumYNYbcWq3TwQlkAKZHAdtIkMcdIq5coBewPn1hEf1ulm7xmGkA&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=Aue2kjRKsfn8qtmoBHE_Ely&oh=00_AYB9JviomP_jd-hItsljQDfCcfN9UV7JHYx3X1z3dw3qww&oe=67BB2AD3" }} style={styles.logo} />
        </View>
        <Text style={styles.title}>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</Text>
        <Text style={styles.label}>Usuario</Text>
        <Input placeholder="Usuario" keyboardType="email-address" onChangeText={setEmail} value={email} containerStyle={styles.input} />
        <Text style={styles.label}>Contraseña</Text>
        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
          containerStyle={styles.input}
          rightIcon={<Icon name={showPassword ? "eye-off" : "eye"} type="feather" onPress={() => setShowPassword(!showPassword)} />}
        />
        {!isLogin && (
          <>
            <Text style={styles.label}>Repetir Contraseña</Text>
            <Input
              placeholder="Confirmar contraseña"
              secureTextEntry={!showPassword2}
              onChangeText={setPassword2}
              value={password2}
              containerStyle={styles.input}
              rightIcon={<Icon name={showPassword2 ? "eye-off" : "eye"} type="feather" onPress={() => setShowPassword2(!showPassword2)} />}
            />
          </>
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title={isLogin ? "Iniciar Sesión" : "Crear Cuenta"} onPress={handleAuth} buttonStyle={styles.button} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: { width: "100%", alignItems: "center", padding: 20 },
  logoContainer: { alignItems: "center", marginBottom: 10 },
  logo: { width: width * 0.5, height: width * 0.3, resizeMode: "contain" },
  card: { width: "110%", padding: 20, borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", marginLeft: 10 },
  input: { width: "100%" },
  button: { marginTop: 10, width: "100%", borderRadius: 10, backgroundColor: "#109075" },
  error: { color: "red", marginBottom: 10, textAlign: "center" }
});
