import { FC, useContext } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import { PorchUserButtonProps } from '../../../Types/PorchTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserInfoContext } from '@/context/UserInfoContext';

export const PorchUserButtonGoals : FC<PorchUserButtonProps> = ( { showForm, setShowForm} ) => {
    
    const { userInfo } = useContext(UserInfoContext);
    const isAuth = userInfo?.email;

    return (
        <View className="flex-row items-center">
            <TouchableOpacity
                onPress={() => {
                if (isAuth) {
                    setShowForm((show: boolean) => !show);
                } else {
                    Alert.alert('Access Denied', 'Please log in or verify your email address.');
              }
                }}
            >
                <Icon
                    name={showForm ? 'close-circle-outline' : 'add-circle-outline'}
                    size={30}
                    color="black"
                />
            </TouchableOpacity>
            <View className="pl-2 pb-2 pt-2">
                <Icon name="arrow-back" size={18} color="#4A4A4A" />
            </View>
            <Text className="pl-2 text-xs">
                Check your{' '}
                <Text className="font-bold text-blue-700">stats</Text> and update your{' '}
                <Text className="font-bold text-blue-700">goals!</Text>
            </Text>
        </View>
    );
};
    