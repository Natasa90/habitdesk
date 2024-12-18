import { FC } from "react";
import { View, Text } from "react-native";
import { TitleProps } from "../../../Types/FreeResourcesTypes";

export const Title: FC<TitleProps> = ( { title } ) => {

    return (
		<View>
			<Text className="text-3xl font-bold text-gray-900" >
				{ title }
			</Text>
		</View>
	);
};