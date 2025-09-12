import { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icons from '../../assets/icons/index';

type headType = {
  title: string;
  viewLeft?: ReactElement;
  classNameText?: string;
  classNameHead?: string;
  viewRight?: ReactElement;
};

function HeaderCostumized({
  title,
  viewLeft,
  classNameText,
  classNameHead,
  viewRight,
}: headType) {
  return (
    <View style={styles.headType} className={classNameHead}>
      <View className="absolute left-6 bg-red-100">
        {viewLeft || (
          <Pressable onPress={() => console.log('Back')}>
            <Icons.ArrowLeft width={24} height={24} />
          </Pressable>
        )}
      </View>
      <Text className={classNameText}>{title}</Text>
      <View className="absolute right-6 bg-red-100">{viewRight}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headType: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default HeaderCostumized;
