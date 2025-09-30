import { debounce, isEmpty } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { categoryProductType, filterType, productType } from 'constants/type';
import ProductCard from 'components/ProductCard';
import ButtonCostumized from 'components/Button';
import HeaderCostumized from 'components/Header';
import SearchCostumized from 'components/Search';
import Filter from 'components/Filter';
import Icons from '../../assets/icons/index';
import { colors } from 'constants/color';
import { NativeStackProps } from '../../routes';
import { useProduct } from 'contexts/hooks/useProduct';
import { formatDataFlatList } from 'lib/utils';

function HomeScreen({ navigation }: NativeStackProps) {
  const [search, setSearch] = useState('');
  const { getCategories, getProducts, listProduct, listProductCategory } =
    useProduct();
  const [selectedCategory, setSelectedCategory] =
    useState<categoryProductType | null>(null);
  const [products, setProducts] = useState<productType[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dataFilter, setDataFilter] = useState<filterType>({
    sortType: {
      id: 1,
      label: 'Relevance',
    },
    price: [MIN_PRICE, MAX_PRICE],
    size: null,
  });

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    if (!isEmpty(listProductCategory) && !selectedCategory) {
      setSelectedCategory(listProductCategory[0]);
    }
  }, [listProductCategory, selectedCategory]);

  useEffect(() => {
    if (!selectedCategory || isEmpty(listProductCategory)) return;
    if (selectedCategory.id !== listProductCategory[0].id) {
      setProducts(
        listProduct.filter(item => item.categoryId === selectedCategory.id),
      );
    } else {
      setProducts(listProduct);
    }
  }, [selectedCategory, listProduct, listProductCategory]);

  const handleChange = debounce((inputText: string) => {
    setSearch(inputText);
  }, 500);

  const handleSelectCat = (item: categoryProductType) => () => {
    setSelectedCategory(item);
  };

  const handleTapProduct = (id: number) => () => {
    navigation.navigate('ProductStack', {
      screen: 'ProductDetail',
      params: {
        idProduct: id,
      },
    });
  };

  const handelSaveProduct = (id: number) => () => {
    console.log('Saved product: ', id);
  };

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

  function renderCategory({ item }: { item: categoryProductType }) {
    const isActive = item.id === selectedCategory?.id;

    return (
      <ButtonCostumized
        title={item.value.toString()}
        onPress={handleSelectCat(item)}
        style={[
          styles.categoryStyle,
          isActive ? styles.categoryStyleActive : {},
        ]}
        textStyle={[styles.textStyle, isActive ? styles.textStyleActive : {}]}
      />
    );
  }

  function renderItemProduct({ item }: { item: productType }) {
    return (
      <ProductCard
        {...item}
        onPress={handleTapProduct}
        tapSaved={handelSaveProduct}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView edges={['top']} className="flex-1 bg-primary-0">
        <HeaderCostumized
          viewLeft={
            <Text className="font-MontserratSemiBold text-large">Discover</Text>
          }
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
            data={listProductCategory}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.gapStyle}
            showsHorizontalScrollIndicator={false}
            renderItem={renderCategory}
          />
        </View>
        <View className="flex-1 px-6 mt-4">
          <FlatList
            onScroll={Keyboard.dismiss}
            data={formatDataFlatList(products, 2)}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.gapStyle}
            columnWrapperStyle={styles.gapStyle}
            renderItem={renderItemProduct}
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

export default HomeScreen;
