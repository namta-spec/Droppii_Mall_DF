import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmpty } from 'lodash';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HeaderCostumized from 'components/Header';
import SearchCostumized from 'components/Search';
import { productType } from 'constants/type';
import ItemResultSearch from 'components/ItemResultSearch';
import DataEmpty from 'components/DataEmpty';
import Icons from '../../assets/icons/index';
import { cn } from 'lib/utils';
import { useSearch } from 'contexts/hooks/useSearch';

type TypeRecent = {
  id: number;
  title: string;
};

function RecentSearches({
  handleTapRecent,
}: {
  handleTapRecent: (textRecent: string) => void;
}) {
  const dataRecent: TypeRecent[] = [
    {
      id: 1,
      title: 'Jeans',
    },
    {
      id: 2,
      title: 'Casual clothes',
    },
    {
      id: 3,
      title: 'Hoodie',
    },
    {
      id: 4,
      title: 'Nike shoes black',
    },
    {
      id: 5,
      title: 'V-neck shirt',
    },
    {
      id: 6,
      title: 'Winter clothes',
    },
  ];

  function handleClearRecent() {}

  function handleDeleteRecent(idRecent: number) {
    console.log('Delete recent: ', idRecent);
  }

  function renderHeaderRecent() {
    return dataRecent.length > 0 ? (
      <View className="flex-row justify-between items-center">
        <Text className="font-MontserratSemiBold text-primary-900 text-xl">
          Recent Searches
        </Text>
        <Pressable onPress={handleClearRecent}>
          <Text className="font-MontserratMedium text-primary-900 text-sm underline">
            Clear all
          </Text>
        </Pressable>
      </View>
    ) : null;
  }

  function renderItemRecent({
    item,
    index,
  }: {
    item: TypeRecent;
    index: number;
  }) {
    const onPressItem = () => {
      handleTapRecent(item.title);
    };

    const onDeleteItem = () => {
      handleDeleteRecent(item.id);
    };

    return (
      <TouchableOpacity
        className="flex-1 gap-4"
        onPress={onPressItem}
        key={item.id}
      >
        {index !== 0 && <View className={'border-primary-100 border-t'} />}
        <View className="flex-row justify-between items-center">
          <Text className="font-MontserratRegular text-primary-900 text-base">
            {item.title}
          </Text>
          <Pressable onPress={onDeleteItem}>
            <Icons.CancelCircle />
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={dataRecent}
      ListHeaderComponent={renderHeaderRecent}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItemRecent}
    />
  );
}

function SearchScreen() {
  const { search, dataResult, handleChange } = useSearch();

  const handleTapRecent = (textRecent: string) => {
    handleChange(textRecent);
  };

  const handleTapResult = (id: number) => {
    console.log(id);
  };

  const renderItemResultSearch = ({
    item,
    index,
  }: {
    item: productType;
    index: number;
  }) => {
    return (
      <ItemResultSearch
        {...item}
        handleTapResult={handleTapResult}
        index={index}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView edges={['top']} className="flex-1 bg-primary-0">
        <HeaderCostumized title="Search" viewLeft={<></>} />
        <View className="px-6 flex-row">
          <SearchCostumized
            placeholder="Search for clothes..."
            textSearch={search}
            autoFocus={true}
            onChangeText={handleChange}
          />
        </View>
        <View
          className={cn('flex-1 px-6 mt-4', {
            'flex-row justify-center items-center':
              isEmpty(dataResult) && search,
          })}
        >
          {!isEmpty(dataResult) ? (
            <FlatList
              data={dataResult}
              contentContainerStyle={styles.contentResultStyle}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItemResultSearch}
              ListEmptyComponent={
                <DataEmpty
                  icon={<Icons.Searchduotone />}
                  title="No Results Found!"
                  describe="Try a similar word or something more general."
                />
              }
            />
          ) : (
            <RecentSearches handleTapRecent={handleTapRecent} />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 16,
  },
  contentResultStyle: {
    gap: 20,
  },
});
export default SearchScreen;
