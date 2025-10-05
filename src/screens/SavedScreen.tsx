import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import { cn, formatDataFlatList } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import ProductCard from 'components/ProductCard';
import DataEmpty from 'components/DataEmpty';
import Icons from '../../assets/icons/index';
import { NativeStackProps } from '../../routes';
import { productType } from 'constants/type';
import { isEmpty } from 'lodash';
import { useSaved } from 'contexts/hooks/useSaved';

function SavedScreen({ navigation }: NativeStackProps) {
  const { listSavedProduct, getSavedProducts } = useSaved();

  useEffect(() => {
    getSavedProducts();
  }, []);

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

  function renderItemProduct({ item }: { item: productType }) {
    return (
      <ProductCard
        {...item}
        onPress={handleTapProduct}
        tapSaved={handelSaveProduct}
        imageStyle={styles.imageStyle}
      />
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-0">
      <HeaderCostumized viewLeft={<></>} title="Saved Items" />
      <View
        className={cn('flex-1 px-6 mt-4', {
          'flex-row justify-center items-center': isEmpty(listSavedProduct),
        })}
      >
        <FlatList
          data={formatDataFlatList(listSavedProduct, 2)}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // 2 rows
          contentContainerStyle={styles.gapStyle}
          columnWrapperStyle={styles.gapStyle}
          renderItem={renderItemProduct}
          ListEmptyComponent={
            <DataEmpty
              icon={<Icons.HeartDuotone />}
              title="No Saved Items!"
              describe="You don’t have any saved items. Go to home and add some."
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gapStyle: {
    gap: 10,
  },
  imageStyle: {
    height: 122,
  },
});

export default SavedScreen;
