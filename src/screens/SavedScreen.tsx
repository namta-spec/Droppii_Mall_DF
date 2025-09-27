import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import { cn } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import ProductCard from 'components/ProductCard';
import DataEmpty from 'components/DataEmpty';
import Icons from '../../assets/icons/index';
import { productType } from 'constants/type';

function SavedScreen() {
  const products: productType[] = [
    {
      id: 1,
      name: 'Regular Fit Slogan',
      cost: 1190,
      saved: true,
      categoryId: 1,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 2,
      name: 'Regular Fit Polo',
      cost: 1100,
      saved: true,
      categoryId: 1,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 3,
      name: 'Regular Fit Black',
      cost: 1690,
      saved: true,
      categoryId: 1,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 4,
      name: 'Regular Fit V-Neck',
      cost: 1290,
      saved: true,
      categoryId: 1,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 5,
      name: 'Regular Fit Black',
      cost: 1690,
      saved: true,
      categoryId: 1,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 6,
      name: 'Regular Fit V-Neck',
      cost: 1290,
      saved: true,
      categoryId: 1,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
  ];

  const handleTapProduct = (id: number) => () => {
    console.log('Tap product: ', id);
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
          'flex-row justify-center items-center': products.length === 0,
        })}
      >
        <FlatList
          data={products}
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
