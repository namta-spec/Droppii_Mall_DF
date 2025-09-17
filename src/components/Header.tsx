import { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icons from '../../assets/icons/index';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../../routes';

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
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  function handleGoBack() {
    navigation.goBack();
  }

  function openNotification() {
    navigation.navigate('SubStack', { screen: 'Notification' });
  }

  return (
    <View style={styles.headType} className={classNameHead}>
      <View>
        {viewLeft || (
          <Pressable onPress={handleGoBack}>
            <Icons.ArrowLeft width={24} height={24} />
          </Pressable>
        )}
      </View>
      <Text className={classNameText}>{title}</Text>
      <View>
        {viewRight || (
          <Pressable onPress={openNotification}>
            <Icons.Bell width={24} height={24} />
          </Pressable>
        )}
      </View>
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
