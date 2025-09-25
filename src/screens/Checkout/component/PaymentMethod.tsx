import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getPaymentIcon, formatCreditCard } from 'lib/utils';
import { categoryMethod, TypePaymentMethod } from 'constants/type';
import { DATA_PAYMENT_METHOD } from 'constants/screens';
import Icons from '../../../../assets/icons';
import ButtonCostumized from 'components/Button';
import { colors } from 'constants/color';

type PaymentMethodProps = {
  method: TypePaymentMethod;
  onChangeMethod: (value: TypePaymentMethod) => void;
};

function ItemPaymentMethod({
  item,
  isActive,
  onChangeMethod,
}: {
  item: TypePaymentMethod;
  isActive: boolean;
  onChangeMethod: (value: TypePaymentMethod) => void;
}) {
  const handleChangeMethod = () => {
    onChangeMethod(item);
  };

  return (
    <View className="flex-1">
      <ButtonCostumized
        title={item.title}
        style={[
          styles.buttonMethodStyle,
          isActive ? styles.buttonMethodActiveStyle : {},
        ]}
        textStyle={[styles.textStyle, isActive ? styles.textStyleActive : {}]}
        iconLeft={getPaymentIcon(item.category, isActive)}
        onPress={handleChangeMethod}
      />
    </View>
  );
}

function PaymentMethod({ method, onChangeMethod }: PaymentMethodProps) {
  function onPressVisa() {}

  return (
    <View className="gap-5">
      <View className="border-primary-100 border-t" />
      <View className="gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-MontserratSemiBold text-primary-900 text-xl">
            Payment Method
          </Text>
        </View>
        <View className="gap-4">
          <View className="flex flex-row gap-2">
            {DATA_PAYMENT_METHOD.map(item => {
              const isActive = item.id === method.id;

              return (
                <ItemPaymentMethod
                  item={item}
                  isActive={isActive}
                  onChangeMethod={onChangeMethod}
                  key={item.id}
                />
              );
            })}
          </View>
          {method.category === categoryMethod.Card && (
            <ButtonCostumized
              title=""
              style={[styles.buttonCardStyle]}
              iconLeft={
                <View className="flex-1 flex-row items-center gap-2">
                  <Icons.Visa />
                  <Text className="font-MontserratMedium text-primary-900 text-base">
                    {formatCreditCard(2345573832982512, true)}
                  </Text>
                </View>
              }
              iconRight={<Icons.Edit />}
              textStyle={[styles.textCardStyle]}
              onPress={onPressVisa}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonMethodActiveStyle: {
    borderColor: colors.primary['900'],
    backgroundColor: colors.primary['900'],
  },
  buttonMethodStyle: {
    flex: 1,
    width: '100%',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.primary['100'],
    paddingVertical: 4,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.primary['900'],
  },
  textStyleActive: {
    color: colors.primary['0'],
  },
  buttonCardStyle: {
    borderWidth: 1,
    borderColor: colors.primary['100'],
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonCardHidden: {
    display: 'none',
  },
  textCardStyle: {
    color: colors.primary['900'],
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
});
export default memo(PaymentMethod);
