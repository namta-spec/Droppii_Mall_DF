import { ReactElement } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icons from '../../assets/icons/index';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../../routes';
import { colors } from 'constants/color';

interface headerProps {
  title?: string;
  viewLeft?: ReactElement;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  viewRight?: ReactElement;
}

function HeaderCostumized({
  title,
  viewLeft,
  style,
  textStyle,
  viewRight,
}: headerProps) {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  function handleGoBack() {
    navigation.goBack();
  }

  function openNotification() {
    navigation.navigate('SubStack', { screen: 'Notification' });
  }

  return (
    <View style={[styles.headerStyle, style]}>
      {viewLeft || (
        <Pressable onPress={handleGoBack}>
          <Icons.ArrowLeft width={24} height={24} />
        </Pressable>
      )}
      <Text style={[styles.headerTextStyle, textStyle]}>{title}</Text>
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
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.primary['0'],
  },
  headerTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.primary['900'],
    fontSize: 24,
  },
});

export default HeaderCostumized;
