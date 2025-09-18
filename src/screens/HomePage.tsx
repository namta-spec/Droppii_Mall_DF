import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from 'lib/utils';
import ProductCard from 'components/ProductCard';
import ButtonCostumized from 'components/Button';
import HeaderCostumized from 'components/Header';
import SearchCostumized from 'components/Search';
import Icons from '../../assets/icons/index';
import Filter from 'components/Filter';

type categoryType = {
  id: number;
  value: String;
};

type productType = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  saved?: boolean;
};

type SortType = {
  id: number;
  label: string;
};

enum SizeType {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = '2XL',
  XXXL = '3XL',
  XXXXL = '4XL',
}

type filterType = {
  sortType: SortType;
  price: number[];
  size: SizeType | null;
};

function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<categoryType>({
    id: 1,
    value: 'All',
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  console.log(search);

  const [dataFilter, setDataFilter] = useState<filterType>({
    sortType: {
      id: 1,
      label: 'Relevance',
    },
    price: [0, 100],
    size: null,
  });

  const categories: categoryType[] = [
    { id: 1, value: 'All' },
    { id: 2, value: 'Tshirts' },
    { id: 3, value: 'Jeans' },
    { id: 4, value: 'Shoes' },
    { id: 5, value: 'Orther' },
  ];

  const products: productType[] = [
    {
      id: 1,
      name: 'Regular Fit Slogan',
      cost: 1190,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 2,
      name: 'Regular Fit Polo',
      cost: 1100,
      discount: -52,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 3,
      name: 'Regular Fit Black',
      cost: 1690,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 4,
      name: 'Regular Fit V-Neck',
      cost: 1290,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 5,
      name: 'Regular Fit Black',
      cost: 1690,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 6,
      name: 'Regular Fit V-Neck',
      cost: 1290,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
  ];

  function handleSelectCat(item: categoryType) {
    setSelectedCategory(item);
  }

  function handleTapProduct(id: number) {
    console.log('Tap product: ', id);
  }

  function handelSaveProduct(id: number) {
    console.log('Saved product: ', id);
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  function handleSetDataFilter(filterInput: filterType) {
    setDataFilter(filterInput);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-primary-0">
        <HeaderCostumized
          viewLeft={
            <Text className="font-MontserratSemiBold text-large">Discover</Text>
          }
          classNameText="font-MontserratSemiBold primary-900 text-2xl"
        />
        <View className="px-6 flex flex-row gap-2">
          <SearchCostumized
            placeholder="Search for clothes..."
            onChangeText={setSearch}
          />
          <ButtonCostumized
            title=""
            onPress={handlePresentModalPress}
            classNameButton="bg-primary-900 px-4"
            iconLeft={<Icons.Filter />}
          />
        </View>
        <View className="ml-6 mt-4">
          <FlatList
            horizontal
            data={categories}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.gapStyle}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isActive = item.id === selectedCategory.id;

              return (
                <ButtonCostumized
                  title={item.value.toString()}
                  onPress={() => handleSelectCat(item)}
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
        <View className="flex-1 px-6 mt-4">
          <FlatList
            onScroll={Keyboard.dismiss}
            data={products}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            numColumns={2} // 2 rows
            contentContainerStyle={styles.gapStyle}
            columnWrapperStyle={styles.gapStyle}
            renderItem={({ item }) => (
              <ProductCard
                {...item}
                onPress={handleTapProduct}
                tapSaved={handelSaveProduct}
              />
            )}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backgroundStyle={styles.backgroundStyle}
          handleIndicatorStyle={styles.handleIndicatorStyle}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
        >
          <BottomSheetView>
            <Filter
              dataFilter={dataFilter}
              setDataFilter={handleSetDataFilter}
              handleCloseModal={handleCloseModalPress}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  gapStyle: {
    gap: 10,
  },
  backgroundStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  handleIndicatorStyle: {
    backgroundColor: '#E6E6E6',
    width: 64,
    borderRadius: 40,
  },
});

export default HomePage;
