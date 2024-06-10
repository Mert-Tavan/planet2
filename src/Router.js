import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./pages/HomePage";
import AgendaPage from "./pages/AgendaPage";
import AddPage from "./pages/AddPage";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          //   tabBarShowLabel: false,
          //tabBarLabelPosition: "below-icon",
          //tabBarActiveTintColor: "blue",
        }}
      >
        <Tab.Screen //Home
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Icon name={"planet"} size={30} />, //movie-edit
            headerShown: false,
          }}
        />
        <Tab.Screen //FavoritesPage
          name="Agenda"
          component={AgendaPage}
          options={{
            tabBarLabel: "Agenda",
            tabBarIcon: () => <Icon name={"calendar-number"} size={30} />, //folder-heart
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}