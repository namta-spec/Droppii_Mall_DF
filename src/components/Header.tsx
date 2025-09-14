import { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icons from '../../assets/icons/index';
import { useNavigation } from '@react-navigation/native';

type headType = {
  title?: string;
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
  const navigation = useNavigation();
  return (
    <View style={styles.headType} className={classNameHead}>
      <View>
        {viewLeft || (
          <Pressable onPress={() => navigation.goBack()}>
            <Icons.ArrowLeft width={24} height={24} />
          </Pressable>
        )}
      </View>
      <Text className={classNameText}>{title}</Text>
      <View>{viewRight}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default HeaderCostumized;
