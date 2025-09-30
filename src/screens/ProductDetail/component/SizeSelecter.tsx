import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SizeType } from 'constants/type';
import ButtonCostumized from 'components/Button';
import { colors } from 'constants/color';
import { DATA_SIZE } from 'constants/screens';

function SizeSelector({
  size,
  handleChangeSize,
}: {
  size: SizeType | null;
  handleChangeSize: (size: SizeType) => () => void;
}) {
  function renderItemSize({ item }: { item: SizeType }) {
    const isActive = size === item;
    return (
      <ButtonCostumized
        title={item}
        onPress={handleChangeSize(item)}
        style={[styles.buttonStyle, isActive ? styles.buttonActiveStyle : {}]}
        textStyle={[styles.textStyle, isActive ? styles.textActiveStyle : {}]}
      />
    );
  }

  return (
    <View className="gap-3">
      <Text className="text-xl text-primary-900 font-MontserratSemiBold">
        Choose size
      </Text>
      <FlatList
        data={DATA_SIZE}
        horizontal={true}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemSize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 10,
  },
  buttonStyle: {
    backgroundColor: colors.primary['0'],
    height: 47,
    width: 50,
    borderWidth: 1,
    borderColor: colors.primary['100'],
  },
  buttonActiveStyle: {
    borderColor: colors.primary['900'],
    backgroundColor: colors.primary['900'],
  },
  textStyle: {
    color: colors.primary['900'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  textActiveStyle: {
    color: colors.primary['100'],
  },
});

export default SizeSelector;
