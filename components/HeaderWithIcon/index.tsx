import { FC } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

import { HeaderWithIconProps } from '../../Types/LayoutTypes';

export const HeaderWithIcon: FC<HeaderWithIconProps> = ({icon, title}) => {
    return (
        <View className="flex-row items-center justify-center">
            <Icon name={icon} size={24} color="#4F6CAD" style={{ marginRight: 12 }} />
            <Text className="text-2xl font-bold text-[#4F6CAD]">{title}</Text>
        </View>
    );
};

