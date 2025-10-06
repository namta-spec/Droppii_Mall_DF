import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import TabBarOrder from 'components/TabBarOrder';
import { TopTabParamList } from '../../routes';
import CompletedOrder from 'screens/MyOrder/CompletedOrder';
import OnGoingOrder from 'screens/MyOrder/OnGoingOrder';

const MyOrderTabs = createMaterialTopTabNavigator<TopTabParamList>();

function CustomTabBar(props: MaterialTopTabBarProps) {
  return <TabBarOrder {...props} />;
}

function MyOrderTab() {
  return (
    <MyOrderTabs.Navigator tabBar={CustomTabBar}>
      <MyOrderTabs.Screen name="OnGoing" component={OnGoingOrder} />
      <MyOrderTabs.Screen name="Completed" component={CompletedOrder} />
    </MyOrderTabs.Navigator>
  );
}

export default MyOrderTab;
