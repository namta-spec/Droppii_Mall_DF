import { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ButtonCostumized from './Button';
import { SortType } from 'constants/type';
import { colors } from 'constants/color';

type SortProp = {
  sortType: SortType;
  setSortType: (item: SortType) => void;
};

const dataSort: SortType[] = [
  {
    id: 1,
    label: 'Relevance',
    type: 'relevance',
  },
  {
    id: 2,
    label: 'Price: Low - High',
    type: 'lowToHight',
  },
  {
    id: 3,
    label: 'Price: High - Low',
    type: 'hightToLow',
  },
];

function Sort({ sortType, setSortType }: SortProp) {
  return (
    <View className="flex-1 gap-4">
      <View className={'border-t border-primary-100 mx-6'} />
      <Text className="px-6 font-MontserratSemiBold text-primary-900 text-base">
        Sort By
      </Text>
      <View className="pl-6">
        <FlatList
          horizontal
          data={dataSort}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.gapStyle}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isActive = item.id === sortType.id;

            return (
              <ButtonCostumized
                title={item.label.toString()}
                onPress={() => setSortType(item)}
                style={[
                  styles.buttonStyle,
                  isActive ? styles.buttonActiveStyle : {},
                ]}
                textStyle={[
                  styles.textStyle,
                  isActive ? styles.textActiveStyle : {},
                ]}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gapStyle: {
    gap: 10,
  },
  buttonStyle: {
    backgroundColor: colors.primary['0'],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.primary['100'],
  },
  buttonActiveStyle: {
    borderColor: colors.primary['900'],
    backgroundColor: colors.primary['900'],
  },
  textStyle: {
    color: colors.primary['900'],
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  textActiveStyle: {
    color: colors.primary['100'],
  },
});

export default memo(Sort);
