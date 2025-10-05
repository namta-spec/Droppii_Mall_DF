import HeaderCostumized from 'components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../assets/icons/index';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ReactElement, useState } from 'react';
import { colors } from 'constants/color';
import { NativeStackProps } from '../../routes';
import { useAuth } from 'contexts/hooks/useAuth';
import ModalCustom from 'components/Modal';

type MenuAccountType = {
  id: number;
  icon: ReactElement;
  title: string;
  line: 'long' | 'short' | 'large';
  className?: string;
  isLogout?: boolean;
  onClick?: () => void;
};

type GetLineType = {
  className?: string;
  borderWidth: number;
};

function getLine(itemInput: MenuAccountType): GetLineType {
  switch (itemInput.line) {
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

function AccountScreen({ navigation }: NativeStackProps) {
  const { handleLogout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const accountMenuItem: MenuAccountType[] = [
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
      onClick: () => {
        navigation.navigate('InfoPaymentStack', { screen: 'Address' });
      },
    },
    {
      id: 4,
      icon: <Icons.Card color={colors.primary['900']} />,
      title: 'Payment Methods',
      line: 'short',
      onClick: () => {
        navigation.navigate('InfoPaymentStack', { screen: 'PaymentMethod' });
      },
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
      onClick() {
        setModalVisible(true);
      },
    },
  ];

  function closeModal() {
    setModalVisible(false);
  }

  const openTargetScreen = (item: MenuAccountType) => () => {
    if (typeof item?.onClick === 'function') {
      item.onClick();
    }
  };

  function renderMenuAccount({ item }: { item: MenuAccountType }) {
    return (
      <Pressable className="flex-1" onPress={openTargetScreen(item)}>
        <View className={getLine(item)?.className}>
          <View
            className={'border-primary-100'}
            style={{ borderTopWidth: getLine(item).borderWidth }}
          />
        </View>
        <View className="px-6">
          <View
            style={styles.itemAccountStyle}
            className="flex flex-row items-center gap-5"
          >
            {item.icon}
            <Text style={styles.textStyle} className={item.className}>
              {item.title}
            </Text>
            {!item?.isLogout && <Icons.Chevron style={styles.arrowStyle} />}
          </View>
        </View>
        <ModalCustom
          closeModal={closeModal}
          modalVisible={modalVisible}
          styleButton={styles.styleButton}
          styleText={styles.styleTextButton}
          type="waring"
          title="Logout?"
          text="Are you sure you want to logout?"
          titleDeleteButton="Yes, Logout"
          titleButton="No, Cancle"
          onPressDeleteButton={handleLogout}
          onPressButton={closeModal}
        />
      </Pressable>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-0">
      <HeaderCostumized title="Account" viewLeft={<></>} />
      <FlatList
        className="flex-1"
        data={accountMenuItem}
        renderItem={renderMenuAccount}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  styleButton: {
    backgroundColor: colors.primary['0'],
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary['200'],
  },
  styleTextButton: {
    color: colors.primary['900'],
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});
export default AccountScreen;
