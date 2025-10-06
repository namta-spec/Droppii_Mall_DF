import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabBar from 'components/TabBar';
import { RootBottomParamList } from '../../routes';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import SavedStack from './SavedStack';
import CartStack from './CartStack';
import AccountStack from './AccountStack';
import { useCart } from 'contexts/hooks/useCart';
import { useEffect } from 'react';

const TabBarNavigator = createBottomTabNavigator<RootBottomParamList>();

function CustomTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

function MainTab() {
  const { cart, getCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <TabBarNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      tabBar={CustomTabBar}
    >
      <TabBarNavigator.Screen name="Home" component={HomeStack} />
      <TabBarNavigator.Screen name="Search" component={SearchStack} />
      <TabBarNavigator.Screen name="Saved" component={SavedStack} />
      <TabBarNavigator.Screen
        options={{
          tabBarBadge: cart.length,
        }}
        name="Cart"
        component={CartStack}
      />
      <TabBarNavigator.Screen name="Account" component={AccountStack} />
    </TabBarNavigator.Navigator>
  );
}

export default MainTab;
