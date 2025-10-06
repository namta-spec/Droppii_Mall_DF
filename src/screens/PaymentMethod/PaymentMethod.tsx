import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { cn } from 'lib/utils';
import HeaderCostumized from 'components/Header';
import ButtonCostumized from 'components/Button';
import { CardType } from 'constants/type';
import { NativeStackProps } from '../../../routes';
import Icons from '../../../assets/icons';
import { colors } from 'constants/color';
import { usePaymentMethod } from 'contexts/hooks/usePaymentMethod';
import ItemCard from 'components/ItemCard';

function PaymentMethod({ navigation }: NativeStackProps) {
  const { card, listCard, getListCard, setCard } = usePaymentMethod();
  const [cardState, setCardState] = useState(card);

  useEffect(() => {
    getListCard();
  }, []);

  function handleApply() {
    setCard(cardState);
    setImmediate(() => {
      navigation.goBack();
    });
  }

  function openNewAddress() {
    navigation.navigate('NewCard');
  }

  const handleChangeAddress = (inputCard: CardType) => () => {
    setCardState(inputCard);
  };

  function renderItem({ item }: { item: CardType }) {
    const isChoosed = cardState?.token === item.token;

    return (
      <Pressable
        onPress={handleChangeAddress(item)}
        className="flex flex-row justify-between items-center px-5 py-4 rounded-lg border border-primary-100 gap-4"
      >
        <View className="flex-1">
          <ItemCard item={item} isShowDefault />
        </View>
        {isChoosed ? <Icons.RadioButton /> : <Icons.RadioButtonEmpty />}
      </Pressable>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-0">
      <HeaderCostumized title="Payment Method" />
      <View
        className={cn('flex-1 px-6 mt-4 gap-5', {
          'gap-0': isEmpty(listCard),
        })}
      >
        <View className="border-primary-100 border-t" />
        <Text
          className={cn('font-MontserratSemiBold text-primary-900 text-xl', {
            'hidden border-hidden': isEmpty(listCard),
          })}
        >
          Saved Cards
        </Text>
        <FlatList
          data={listCard}
          keyExtractor={item => item.token}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={renderItem}
          ListFooterComponentStyle={styles.ListFooterComponentStyle}
          ListFooterComponent={
            <ButtonCostumized
              iconLeft={<Icons.PlusLarge />}
              title="Add New Card"
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
            isEmpty(listCard) ? styles.hiddenStyle : {},
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
export default PaymentMethod;
