import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import { PorchScreen } from './screens/porch';
import { FreeResourcesScreen } from './screens/freeResources';
import { LoginScreen } from './screens/login';

export default function App() {
  return (
    <ScrollView className="flex-1 mt-9">
        <PorchScreen/>
        <FreeResourcesScreen />
        <LoginScreen />
      <StatusBar style="light" />
    </ScrollView>
  );
}

