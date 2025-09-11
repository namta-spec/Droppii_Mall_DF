import { ReactElement } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type buttonType = {
  title: string;
  classNameButton?: string;
  classNameText?: string;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  onPress: () => void;
};

function ButtonCostumized({
  title,
  classNameButton,
  classNameText,
  iconLeft,
  iconRight,
  onPress,
}: buttonType) {
  return (
    <Pressable
      className={classNameButton}
      style={[styles.buttonType]}
      onPress={onPress}
    >
      {iconLeft}
      <Text className={classNameText}>{title}</Text>
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
    paddingTop: 16,
    paddingBottom: 16,
    gap: 10,
  },
});

export default ButtonCostumized;
