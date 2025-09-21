import { ReactElement } from 'react';
import { Text, View } from 'react-native';

type EmptyProps = {
  icon: ReactElement;
  title: string;
  describe: string;
};

function DataEmpty({ icon, title, describe }: EmptyProps) {
  return (
    <View className="flex-1 justify-center items-center gap-5">
      {icon}
      <View className="gap-3">
        <Text className="text-primary-900 font-MontserratSemiBold text-2xl text-center">
          {title}
        </Text>
        <Text className="text-primary-500 font-MontserratRegular text-lg text-center">
          {describe}
        </Text>
      </View>
    </View>
  );
}

export default DataEmpty;
