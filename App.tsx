import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
import { Porch } from './screens/porch';

export default function App() {
  return (
    <ScrollView className="flex-1 mt-9">
        <Porch/>
      <StatusBar style="light" />
    </ScrollView>
  );
}

