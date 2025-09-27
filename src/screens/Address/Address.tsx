import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { usePreventRemove } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import { cn } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import ButtonCostumized from 'components/Button';
import { addressType } from 'constants/type';
import { NativeStackProps } from '../../../routes';
import ItemAddress from 'components/ItemAddress';
import Icons from '../../../assets/icons';
import { colors } from 'constants/color';
import { useAddress } from 'contexts/hooks/useAddress';

function Address({ navigation }: NativeStackProps) {
  const { address, listAddress, getListAddress, setAddress } = useAddress();
  const [addressState, setAddressState] = useState(address);

  useEffect(() => {
    getListAddress();
  }, []);

  usePreventRemove(!address, () => {
    Toast.show({
      type: 'warn',
      text1: 'Waring!',
      text2: 'Please choose to continue',
      icon: <Icons.Bell />,
      closeIcon: <></>,
      backgroundColor: colors.primary['100'],
    });
  });

  function handleApply() {
    setAddress(addressState);
    setImmediate(() => {
      navigation.goBack();
    });
  }

  function openNewAddress() {
    navigation.navigate('NewAddress');
  }

  const handleChangeAddress = (inputAddress: addressType) => () => {
    setAddressState(inputAddress);
  };

  function renderItem({ item }: { item: addressType }) {
    const isChoosed = addressState?.id === item.id;

    return (
      <Pressable
        onPress={handleChangeAddress(item)}
        className="flex flex-row justify-between items-center px-5 py-4 rounded-lg border border-primary-100 gap-4"
      >
        <View className="flex-1">
          <ItemAddress
            item={item}
            isShowDefault
            classNameAddress="items-center"
          />
        </View>
        {isChoosed ? <Icons.RadioButton /> : <Icons.RadioButtonEmpty />}
      </Pressable>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized title="Address" />
      <View
        className={cn('flex-1 px-6 mt-4 gap-5', {
          'gap-0': isEmpty(listAddress),
        })}
      >
        <View className="border-primary-100 border-t" />
        <Text
          className={cn('font-MontserratSemiBold text-primary-900 text-xl', {
            'hidden border-hidden': isEmpty(listAddress),
          })}
        >
          Saved Address
        </Text>
        <FlatList
          data={listAddress}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={renderItem}
          ListFooterComponentStyle={styles.ListFooterComponentStyle}
          ListFooterComponent={
            <ButtonCostumized
              iconLeft={<Icons.PlusLarge />}
              title="Add New Address"
              style={[styles.buttonAddStyle]}
              onPress={openNewAddress}
            />
          }
        />
      </View>
      <View className="px-6 py-5">
        <ButtonCostumized
          title="Apply"
          style={[
            styles.buttonStyle,
            isEmpty(listAddress) ? styles.hiddenStyle : {},
          ]}
          textStyle={[styles.textStyle]}
          onPress={handleApply}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 12,
  },
  ListFooterComponentStyle: {
    paddingTop: 12,
  },
  buttonStyle: {
    backgroundColor: colors.primary['900'],
    paddingVertical: 16,
  },
  textStyle: {
    color: colors.primary['0'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  hiddenStyle: {
    display: 'none',
  },
  buttonAddStyle: {
    borderWidth: 1,
    borderColor: colors.primary['200'],
    gap: 10,
    paddingVertical: 16,
  },
});
export default Address;
