import { FC, useContext, useState, useEffect } from "react";
import { Alert, View, Text, TouchableOpacity, Modal } from "react-native";
import UserInfoContext from "../../../context/UserInfoContext";
import Icon from "react-native-vector-icons/Ionicons";
import { PorchUserButtonProps } from "../../../Types/PorchTypes";


export const PorchUserButtonUpdates: FC <PorchUserButtonProps> = ({ showForm, setShowForm }) => {
	
    const { userInfo } = useContext(UserInfoContext);
    const isAuth = userInfo?.email;

    return (
      <View className="flex-row items-center">
          <TouchableOpacity
            className="pl-1"
            onPress={() => {
              if (isAuth) {
                setShowForm((show: boolean) => !show);
              } else {
                Alert.alert('Access Denied', 'Please log in or verify your email address.');
              }
            }}
          >
           <View className="w-6 h-6 rounded-full border-2 border-black">
              <Icon
                name="trending-up" 
                size={18}
                color="black"
              />
            </View>
          </TouchableOpacity>
          <View className="pl-2.5 pb-2 pt-2">
            <Icon name="arrow-back" size={18} color="#4A4A4A" />
          </View>
          <Text className="pl-2.5 pb-2 pt-1.5 text-xs">
            Post your{' '}
            <Text className="font-bold text-blue-700">progress!</Text>
          </Text>
        </View>
      );
    };

