import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { PorchScreen } from './screens/porch';
import { FreeResourcesScreen } from './screens/freeResources';
import { LoginScreen } from './screens/login';
import { CreateAccountScreen } from './screens/createAccount';
import { ResetPasswordScreen } from './screens/resetPassword';

export default function App() {
    return (
        <ScrollView className="flex-1 mt-9">
            <PorchScreen/>
            <FreeResourcesScreen />
            <LoginScreen />
            <CreateAccountScreen />
            <ResetPasswordScreen /> 
            <StatusBar style="light" />
        </ScrollView>
    );
}

