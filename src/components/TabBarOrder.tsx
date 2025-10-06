import { View, Platform, Text } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopTabParamList } from '../../routes';
import HeaderCostumized from './Header';
import { cn } from 'lib/utils';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

type TabLabel = keyof TopTabParamList;

export default function TabBarOrder({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <SafeAreaView edges={['top']}>
      <HeaderCostumized title="My Orders" />
      <View className="px-6 bg-primary-0">
        <View className="flex-row gap-2 bg-primary-100 rounded-xl p-4">
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
                accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                key={index}
                className={cn('flex-1 items-center p-4 rounded-xl', {
                  'bg-primary-0 opacity-100': isFocused,
                })}
              >
                <Text
                  style={{ color: colors.text, opacity: isFocused ? 100 : 50 }}
                >
                  {route.name as TabLabel}
                </Text>
              </PlatformPressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
