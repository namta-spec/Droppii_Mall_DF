import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCostumized from 'components/Header';
import { cn, getIcon, getTitleDate } from 'lib/utils';
import { typeCategory } from 'constants/type';
import DataEmpty from 'components/DataEmpty';
import Icons from '../../assets/icons/index';

type NotificationType = {
  id: number;
  title: string;
  subTitle: string;
  date: number;
  line: 'long' | 'short';
  category: typeCategory;
};

type ConvertNotificationType = {
  titleDate: number;
  data: NotificationType[];
};

const dataNotification: NotificationType[] = [
  {
    id: 1,
    category: 'Discount',
    title: '30% Special Discount!',
    subTitle: 'Special promotion only valid today.',
    date: new Date('2025-09-18').getTime(),
    line: 'long',
  },
  {
    id: 2,
    category: 'E-Wallet',
    title: 'Top Up E-wallet Successfully!',
    subTitle: 'You have top up your e-wallet.',
    date: new Date('2025-09-17').getTime(),
    line: 'long',
  },
  {
    id: 3,
    category: 'Location',
    title: 'New Service Available!',
    subTitle: 'Now you can track order in real-time.',
    date: new Date('2025-09-17').getTime(),
    line: 'short',
  },
  {
    id: 4,
    category: 'Credit',
    title: 'Credit Card Connected!',
    subTitle: 'Credit card has been linked.',
    date: new Date('2025-09-15').getTime(),
    line: 'long',
  },
  {
    id: 5,
    category: 'Account',
    title: 'Account Setup Successfully!',
    subTitle: 'Your account has been created.',
    date: new Date('2025-09-15').getTime(),
    line: 'short',
  },
];

function convertNotification(
  originalData: NotificationType[],
): ConvertNotificationType[] {
  return originalData.reduce((newData: ConvertNotificationType[], item) => {
    const exitGroupDate = newData.find(
      group => group.titleDate === new Date(item.date).setHours(0, 0, 0, 0),
    );
    if (exitGroupDate) {
      exitGroupDate.data.push(item);
    } else {
      newData.push({
        titleDate: new Date(item.date).setHours(0, 0, 0, 0),
        data: [item],
      });
    }
    return newData;
  }, []);
}

function renderItem(item: NotificationType, index: number) {
  return (
    <View className="gap-4">
      {index !== 0 && <View className="border-primary-100 border-t mx-12" />}
      <View className="flex flex-row items-center gap-5">
        {getIcon(item?.category)}
        <View className="gap-1">
          <Text className="font-MontserratSemiBold text-base text-primary-900">
            {item?.title}
          </Text>
          <Text className="font-MontserratRegular text-sm text-primary-500">
            {item?.subTitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

function renderSectionHeader(titleDate: number) {
  return (
    <View className="gap-5">
      <View className="border-primary-100 border-t" />
      <Text className="font-MontserratSemiBold text-base text-primary-900 ">
        {getTitleDate(titleDate)}
      </Text>
    </View>
  );
}

function Notification() {
  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized
        title="Notification"
        classNameHead="bg-primary-0"
        classNameText="font-MontserratSemiBold primary-900 text-2xl"
      />
      <View
        className={cn('flex-1 px-6 mt-4', {
          'flex-row justify-center items-center': dataNotification.length === 0,
        })}
      >
        <SectionList
          sections={convertNotification(dataNotification)}
          keyExtractor={(item, index) => (item.id + index).toString()}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item, index }) => renderItem(item, index)}
          renderSectionHeader={({ section: { titleDate } }) =>
            renderSectionHeader(titleDate)
          }
          ListEmptyComponent={
            <DataEmpty
              icon={<Icons.BellDuotone />}
              title="You haven’t gotten any notifications yet!"
              describe="We’ll alert you when something cool happens."
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 16,
  },
});

export default Notification;
