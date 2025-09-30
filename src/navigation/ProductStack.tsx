import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../routes';
import ProductDetail from 'screens/ProductDetail/ProductDetail';
import Review from 'screens/Review/Review';

const ProductStacks = createNativeStackNavigator<MainStackParamList>();

function ProductStack() {
  return (
    <ProductStacks.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      <ProductStacks.Screen name="ProductDetail" component={ProductDetail} />
      <ProductStacks.Screen name="Review" component={Review} />
    </ProductStacks.Navigator>
  );
}

export default ProductStack;
