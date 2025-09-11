import { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={[styles.headType]} className={classNameHead}>
      {viewLeft}
      <Text className={classNameText}>{title}</Text>
      {viewRight}
    </View>
  );
}

const styles = StyleSheet.create({
  headType: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
});

export default HeaderCostumized;
