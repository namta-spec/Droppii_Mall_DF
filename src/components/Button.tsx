import { ReactElement } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface buttonProps extends PressableProps {
  title: string;
  loading?: boolean;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
}
import { colors } from 'constants/color';

function ButtonCostumized({
  title,
  loading,
  iconLeft,
  iconRight,
  textStyle,
  style,
  ...rest
}: buttonProps) {
  return (
    <Pressable {...rest} style={[styles.buttonType, style]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.primary['900']} />
      ) : (
        <>
          {iconLeft}
          <Text style={textStyle}>{title}</Text>
          {iconRight}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonType: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonCostumized;
