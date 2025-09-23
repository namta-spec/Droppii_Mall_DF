import { debounce } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useRef, useState } from 'react';
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MAX_PRICE, MIN_PRICE } from 'constants/screens';
import { productType } from 'constants/type';
import ProductCard from 'components/ProductCard';
import ButtonCostumized from 'components/Button';
import HeaderCostumized from 'components/Header';
import SearchCostumized from 'components/Search';
import Filter from 'components/Filter';
import Icons from '../../assets/icons/index';
import { colors } from 'constants/color';

type categoryType = {
  id: number;
  value: String;
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

  const [dataFilter, setDataFilter] = useState<filterType>({
    sortType: {
      id: 1,
      label: 'Relevance',
    },
    price: [MIN_PRICE, MAX_PRICE],
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

  const handleChange = debounce((inputText: string) => {
    setSearch(inputText);
  }, 500);

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
            textSearch={search}
            onChangeText={handleChange}
          />
          <ButtonCostumized
            title=""
            onPress={handlePresentModalPress}
            style={[styles.buttonStyle]}
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
                  style={[
                    styles.categoryStyle,
                    isActive
                      ? styles.categoryStyleActive
                      : {},
                  ]}
                  textStyle={[
                    styles.textStyle,
                    isActive ? styles.textStyleActive : {},
                  ]}
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
    backgroundColor: colors.primary['0'],
    borderRadius: 20,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.primary['100'],
    width: 64,
    borderRadius: 40,
  },
  buttonStyle: {
    paddingHorizontal: 16,
    backgroundColor: colors.primary['900'],
  },
  categoryStyleActive: {
    backgroundColor: colors.primary['900'],
    borderColor: colors.primary['900'],
  },
  categoryStyle: {
    backgroundColor: colors.primary['0'],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primary['100'],
  },
  textStyleActive: {
    color: colors.primary['0'],
  },
  textStyle: {
    fontFamily: 'Montserrat-Medium',
    color: colors.primary['900'],
    fontSize: 12,
  },
});

export default HomePage;
