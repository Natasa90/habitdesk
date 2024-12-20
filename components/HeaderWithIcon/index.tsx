import { FC } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { HeaderWithIconProps } from '../../Types/LayoutTypes';

export const HeaderWithIcon: FC<HeaderWithIconProps> = ({icon, title}) => {
    return (
        <View className="ml-8 flex-row items-center">
            <Icon name={icon} size={24} color="#0B65C2" style={{ marginRight: 12 }} />
            <Text className="text-2xl font-bold text-[#0B65C2]">{title}</Text>
        </View>
    );
};

