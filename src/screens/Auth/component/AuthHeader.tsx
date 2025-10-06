import { Text, TextStyle, View } from 'react-native';

export default function AuthHeader({
  title,
  text,
  style,
}: {
  title: string;
  text: string;
  style?: TextStyle;
}) {
  return (
    <View className="gap-2">
      <Text
        className="font-MontserratBold text-large leading-none"
        style={style}
      >
        {title}
      </Text>
      <Text className="text-primary-500 font-MontserratRegular text-base">
        {text}
      </Text>
    </View>
  );
}
