import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import { cn } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import ProductCard from 'components/ProductCard';
import DataEmpty from 'components/DataEmpty';
import Icons from '../../assets/icons/index';

type productType = {
  id: number;
  name: string;
  cost: number;
  image: string;
  discount?: number;
  saved?: boolean;
};
function Saved() {
  const products: productType[] = [
    {
      id: 1,
      name: 'Regular Fit Slogan',
      cost: 1190,
      saved: true,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 2,
      name: 'Regular Fit Polo',
      cost: 1100,
      saved: true,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 3,
      name: 'Regular Fit Black',
      cost: 1690,
      saved: true,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 4,
      name: 'Regular Fit V-Neck',
      cost: 1290,
      saved: true,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 5,
      name: 'Regular Fit Black',
      cost: 1690,
      saved: true,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
    {
      id: 6,
      name: 'Regular Fit V-Neck',
      cost: 1290,
      saved: true,
      image:
        'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477199/item/vngoods_08_477199_3x4.jpg?width=423',
    },
  ];

  function handleTapProduct(id: number) {
    console.log('Tap product: ', id);
  }

  function handelSaveProduct(id: number) {
    console.log('Unsave product: ', id);
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized
        title="Saved Items"
        classNameHead="bg-primary-0"
        classNameText="font-MontserratSemiBold primary-900 text-2xl"
      />
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
          renderItem={({ item }) => (
            <ProductCard
              {...item}
              onPress={handleTapProduct}
              tapSaved={handelSaveProduct}
              classNameImage="h-30"
            />
          )}
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
});

export default Saved;
