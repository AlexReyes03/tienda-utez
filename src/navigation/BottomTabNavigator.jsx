import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import ProfileScreen from "../screens/ProfileScreen";
import CatalogScreen from "../screens/CatalogScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = "account-circle";
          } else if (route.name === "Catalog") {
            iconName = "store";
          }
          return <Icon name={iconName} type="material" size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: "white", height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#1e3d74',
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Tienda Utez - Perfil" }} />
      <Tab.Screen name="Catalog" component={CatalogScreen} options={{ title: "Tienda Utez - Catálogo" }} />
    </Tab.Navigator>
  );
}
