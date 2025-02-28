import MaMapQuiZoomSurGaspe from "./components/MaPremiereComposanteMap";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from "./components/Accueil";
import TroisiemeEcran from './components/TroisiemeEcran';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator(); 
const Tab = createBottomTabNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <DrawerNavigable />
     </NavigationContainer>
  );
}

function TabNavigable() {
  return (
     <Tab.Navigator initialRouteName="Accueil">
        <Tab.Screen name='Accueil'
                    component={Accueil} 
                    options={{title: 'Accueil',
                              tabBarIcon: ({size, focused, color}) => {
                                return (
                                  <Image
                                    style={{ width: size, height: size }}
                                    source={require('./assets/home.png')}
                                  />
                                );
                              },
                            }} 
        />
        <Tab.Screen name="MaMap"
                    component={MaMapQuiZoomSurGaspe}
                    options={{title: 'Ma Map sur Gaspé',
                              tabBarIcon: ({size, focused, color}) => {
                                return (
                                  <Image
                                    style={{ width: size, height: size }}
                                    source={require('./assets/map.png')}
                                  />
                                );
                              }, 
                            }} 
        />
        <Tab.Screen name="TroisiemeEcran" 
                    component={TroisiemeEcran}
                    options={{ title: 'Troisième Écran' }} 
        />
        </Tab.Navigator>
  );
}

function DrawerNavigable() {
  return (
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name='Accueil'
                       component={Accueil} 
                       options={{title: 'Accueil',
                                 drawerIcon: ({size, focused, color}) => {
                                  return (
                                      <Image style={{ width: size, height: size }}
                                             source={require('./assets/home.png')}
                                      />
                                    );
                                  },
                              }} 
        />
        <Drawer.Screen name="MaMap"
                       component={MaMapQuiZoomSurGaspe}
                       options={{title: 'Ma Map sur Gaspé',
                                 drawerIcon: ({size, focused, color}) => {
                                    return (
                                        <Image style={{ width: size, height: size }}
                                               source={require('./assets/map.png')}
                                        />
                                      );
                                    }, 
                                }} 
                        
        />
        <Drawer.Screen name="TroisiemeEcran" 
                       component={TroisiemeEcran}
                       options={{ title: 'Troisième Écran'}} 
        />
    </Drawer.Navigator>
  );
}

function StackNavigable() {
  return (
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name='Accueil'
                      component={Accueil} 
                      options={{title: 'Accueil'}} 
        />
        <Stack.Screen name="MaMap"
                      component={MaMapQuiZoomSurGaspe}
                      options={{title: 'Ma Map sur Gaspé'}} 
                        
        />
        <Stack.Screen name="TroisiemeEcran" 
                      component={TroisiemeEcran}
                      options={{title: 'Troisième Écran'}} 
        />
    </Stack.Navigator>
  );
}