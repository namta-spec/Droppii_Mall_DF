import HeaderCostumized from 'components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../assets/icons/index';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ReactElement } from 'react';

type ItemType = {
  id: number;
  icon: ReactElement;
  title: string;
  line: 'long' | 'short' | 'large';
  className?: string;
  isLogout?: boolean;
};

type GetLineType = {
  className?: string;
  borderWidth: number;
};

function ItemAccount({ variant }: { variant: ItemType }) {
  function getLine(variantInput: ItemType): GetLineType {
    switch (variantInput.line) {
      case 'long':
        return {
          className: 'px-6',
          borderWidth: 1,
        };
      case 'short':
        return {
          className: 'pl-20 pr-6',
          borderWidth: 1,
        };
      case 'large':
        return { borderWidth: 8 };
      default:
        return { className: 'px-6', borderWidth: 1 };
    }
  }

  return (
    <View className="flex-1">
      <View className={getLine(variant)?.className}>
        <View
          className={'border-primary-100'}
          style={{ borderTopWidth: getLine(variant).borderWidth }}
        />
      </View>
      <View className="px-6">
        <View
          style={styles.itemAccountStyle}
          className="flex flex-row items-center gap-5"
        >
          {variant.icon}
          <Text style={[styles.textStyle]} className={variant.className}>
            {variant.title}
          </Text>
          {!variant?.isLogout && <Icons.Chevron style={styles.arrowStyle} />}
        </View>
      </View>
    </View>
  );
}

function Account() {
  const accountMenuItem: ItemType[] = [
    {
      id: 1,
      icon: <Icons.Box />,
      title: 'My Orders',
      line: 'long',
    },
    {
      id: 2,
      icon: <Icons.Details />,
      title: 'My Details',
      line: 'large',
    },
    {
      id: 3,
      icon: <Icons.Address />,
      title: 'Address Book',
      line: 'short',
    },
    {
      id: 4,
      icon: <Icons.Card />,
      title: 'Payment Methods',
      line: 'short',
    },
    {
      id: 5,
      icon: <Icons.Bell />,
      title: 'Notifications',
      line: 'short',
    },
    {
      id: 6,
      icon: <Icons.Question />,
      title: 'FAQs',
      line: 'large',
    },
    {
      id: 7,
      icon: <Icons.Headphones />,
      title: 'Help Center',
      line: 'short',
    },
    {
      id: 8,
      title: 'Logout',
      icon: <Icons.Logout />,
      className: 'text-red',
      line: 'large',
      isLogout: true,
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized
        title="Account"
        classNameHead="bg-primary-0"
        classNameText="font-MontserratSemiBold primary-900 text-2xl"
      />
      <FlatList
        className="flex-1"
        data={accountMenuItem}
        renderItem={({ item }) => <ItemAccount variant={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    borderBottomWidth: 1,
  },
  itemAccountStyle: {
    paddingTop: 21,
    paddingBottom: 21,
  },
  arrowStyle: {
    position: 'absolute',
    right: 0,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  lineBigStyle: {
    borderTopWidth: 8,
  },
});
export default Account;
