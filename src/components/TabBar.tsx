import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from 'lib/utils';
import { navigationRef } from 'lib/navigation';
import {
  Animated,
  Easing,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from '../../assets/icons/index';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { RootBottomParamList } from '../../routes';
import { ROUTES_HIDDEN_TABBAR } from 'constants/screens';
import { colors } from 'constants/color';

type TabLabel = keyof RootBottomParamList;

type typeIconTab = {
  label: TabLabel;
  size: number;
  color: string;
};

function IconTab({ label, size, color }: typeIconTab) {
  function getIconTab(labelInput: TabLabel): ReactElement | undefined {
    switch (labelInput) {
      case 'Home':
        return <Icons.Home width={size} height={size} color={color} />;
      case 'Search':
        return <Icons.Search width={size} height={size} color={color} />;
      case 'Saved':
        return <Icons.Saved width={size} height={size} color={color} />;
      case 'Cart':
        return <Icons.Cart width={size} height={size} color={color} />;
      case 'Account':
        return <Icons.User width={size} height={size} color={color} />;
      default:
        break;
    }
  }
  return getIconTab(label);
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();
  const routeName = navigationRef.current?.getCurrentRoute()?.name;
  const [visible, setVisible] = useState(true);
  const tabBarAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setTimeout(() => {
        setVisible(true);
      }, 100);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(tabBarAnimation, {
      toValue: visible && !ROUTES_HIDDEN_TABBAR.includes(routeName) ? 0 : 100,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [visible, routeName, tabBarAnimation]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: tabBarAnimation }],
      }}
    >
      {!ROUTES_HIDDEN_TABBAR.includes(routeName) && visible && (
        <SafeAreaView
          edges={Platform.OS === 'android' ? ['bottom'] : []}
          className={cn(
            'flex flex-row px-6 py-4 bg-primary-0 border-t border-primary-100',
          )}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <PlatformPressable
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                className="flex-1 items-center"
                key={index}
              >
                <IconTab
                  size={24}
                  color={
                    isFocused ? colors.primary['900'] : colors.primary['400']
                  }
                  label={route.name as TabLabel}
                />
                {options.tabBarBadge ? (
                  <View style={styles.badgeStyle}>
                    <Text style={styles.textBadgeStyle}>
                      {options.tabBarBadge}
                    </Text>
                  </View>
                ) : null}
                <Text
                  className={cn(
                    'text-primary-400 text-sm font-MontserratMedium',
                    {
                      'text-primary-900 ': isFocused,
                    },
                  )}
                >
                  {route.name}
                </Text>
              </PlatformPressable>
            );
          })}
        </SafeAreaView>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badgeStyle: {
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: '100%',
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: -5,
  },
  textBadgeStyle: { fontSize: 12, color: colors.primary['0'] },
});

export default TabBar;
