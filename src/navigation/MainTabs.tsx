import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabBar from 'components/TabBar';
import { RootBottomParamList } from '../../routes';
import HomePage from 'screens/HomePage';
import Search from 'screens/Search';
import Saved from 'screens/Saved';
import Cart from 'screens/Cart';
import Account from 'screens/Account';

const TabBarNavigator = createBottomTabNavigator<RootBottomParamList>();

function CustomTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

function MainTab() {
  return (
    <TabBarNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      tabBar={CustomTabBar}
    >
      <TabBarNavigator.Screen name="Home" component={HomePage} />
      <TabBarNavigator.Screen name="Search" component={Search} />
      <TabBarNavigator.Screen name="Saved" component={Saved} />
      <TabBarNavigator.Screen name="Cart" component={Cart} />
      <TabBarNavigator.Screen name="Account" component={Account} />
    </TabBarNavigator.Navigator>
  );
}

export default MainTab;
