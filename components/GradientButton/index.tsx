import { TouchableOpacity, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { GradientButtonProps } from "../../Types/LayoutTypes";

export const GradientButton = ({ onPress, children }: GradientButtonProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75} // For hover-like opacity effect
      >
        <Svg height="30" width="90">
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#1D4ED8" />
              <Stop offset="0.5" stopColor="#2563EB" />
              <Stop offset="1" stopColor="#1E40AF" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="90" height="30" fill="url(#gradient)" rx="12" />
        </Svg>
        <View className="absolute">
          {children}
        </View>
      </TouchableOpacity>
    );
  };