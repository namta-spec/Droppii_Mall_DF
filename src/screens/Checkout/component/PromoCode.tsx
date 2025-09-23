import { StyleSheet, TextInput, View } from 'react-native';
import ButtonCostumized from '../../../components/Button';
import Icons from '../../../../assets/icons';
import { colors } from 'constants/color';

type PromoCodeType = {
  code: string;
  onChangeCode: (text: string) => void;
  onPressAdd: () => void;
};

function PromoCode({ code, onChangeCode, onPressAdd }: PromoCodeType) {
  return (
    <View className="flex-row gap-2">
      <View className="h-13 border border-primary-100 rounded-xl text-primary-900 flex-1 flex-row items-center justify-center px-6">
        <View className="flex-1 flex-row items-center gap-3">
          <Icons.Discount />
          <TextInput
            placeholder={'Enter promo code'}
            placeholderTextColor={colors.primary['400']}
            className="flex-1"
            onChangeText={onChangeCode}
            defaultValue={code}
          />
        </View>
      </View>
      <ButtonCostumized
        title="Add"
        style={[styles.buttonStyle]}
        textStyle={[styles.textStyle]}
        onPress={onPressAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary['900'],
    paddingHorizontal: 24,
  },
  textStyle: {
    color: colors.primary['0'],
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});

export default PromoCode;
