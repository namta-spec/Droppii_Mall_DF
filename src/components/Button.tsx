import { ReactElement } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface buttonProps extends PressableProps {
  title: string;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
}

function ButtonCostumized({
  title,
  iconLeft,
  iconRight,
  textStyle,
  style,
  ...rest
}: buttonProps) {
  return (
    <Pressable {...rest} style={[styles.buttonType, style]}>
      {iconLeft}
      <Text style={textStyle}>{title}</Text>
      {iconRight}
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
