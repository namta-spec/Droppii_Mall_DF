import { cn } from 'lib/utils';
import { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ButtonCostumized from './Button';
import { SortType } from 'constants/type';


type SortProp = {
  sortType: SortType;
  setSortType: (item: SortType) => void;
};

const dataSort: SortType[] = [
  {
    id: 1,
    label: 'Relevance',
  },
  {
    id: 2,
    label: 'Price: Low - High',
  },
  {
    id: 3,
    label: 'Price: High - Low',
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
                classNameButton={cn(
                  'bg-primary-0 px-6 py-3 border border-primary-100',
                  {
                    'bg-primary-900 border-primary-900': isActive,
                  },
                )}
                classNameText={cn(
                  'text-primary-900 text-xs font-MontserratMedium',
                  {
                    'text-primary-0': isActive,
                  },
                )}
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
});

export default memo(Sort);
