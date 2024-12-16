import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import { Porch } from './screens/porch';
import { FreeResources } from './screens/freeResources';

export default function App() {
  return (
    <ScrollView className="flex-1 mt-9">
        <Porch/>
        <FreeResources />
      <StatusBar style="light" />
    </ScrollView>
  );
}

