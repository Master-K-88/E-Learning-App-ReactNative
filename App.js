import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import LoginView from './App/Views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './App/Navigations/TabNavigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  })
  return fontsLoaded&&(
    <ClerkProvider publishableKey={"pk_test_cGVhY2VmdWwtbGFjZXdpbmctOTYuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
      <View style={styles.container}>
      <View style={styles.container}>
              <SignedIn>
              <NavigationContainer>
                  <TabNavigation />
                </NavigationContainer>
              </SignedIn>
              <SignedOut>
              <LoginView />
              </SignedOut>
            </View>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
