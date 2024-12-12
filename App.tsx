import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Porch } from './screens/porch';

export default function App() {
  return (
    <View className="flex-1 mt-9">
        <Porch/>
      <StatusBar style="light" />
    </View>
  );
}

