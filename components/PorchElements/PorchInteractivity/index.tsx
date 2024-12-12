import { FC, useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { PorchUserButtonProps } from '../../../lib/types';
import Icon from 'react-native-vector-icons/Ionicons';
import UserInfoContext from '../../../context/UserInfoContext';

const PorchUserButton : FC<PorchUserButtonProps> = ( { showUserForm, setShowUserForm} ) => {
    
    const { userInfo } = useContext(UserInfoContext)

    return (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (userInfo?.email) {
                setShowUserForm((show: boolean) => !show);
              } else {
                Alert.alert('Access Denied', 'Please log in or verify your email address.');
              }
            }}
            style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
          >
            <Icon
              name={showUserForm ? 'close-circle-outline' : 'add-circle-outline'}
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>
      );
    };
    
    export default PorchUserButton;
