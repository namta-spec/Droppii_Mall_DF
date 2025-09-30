import { colors } from 'constants/color';
import Icons from '../../assets/icons';
import {
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ButtonCostumized from './Button';

type ModalProps = {
  type: 'waring' | 'success';
  title: string;
  text: string;
  modalVisible: boolean;
  closeModal: () => void;
  titleDeleteButton?: string;
  onPressDeleteButton?: () => void;
  titleButton?: string;
  onPressButton?: () => void;
  styleButton: ViewStyle;
  styleText: TextStyle;
};

export default function ModalCustom({
  type,
  title,
  text,
  modalVisible,
  closeModal,
  onPressButton,
  onPressDeleteButton,
  titleDeleteButton,
  titleButton,
  styleButton,
  styleText,
}: ModalProps) {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      visible={modalVisible}
      backdropColor={'#00000033'}
      onRequestClose={closeModal}
    >
      <TouchableOpacity style={styles.centeredView} onPress={closeModal}>
        <View style={styles.modalView} className="bg-primary-0 gap-6">
          <View className="w-full justify-center items-center">
            {type === 'waring' && <Icons.Warning />}
            {type === 'success' && <Icons.CheckDuotone />}
          </View>
          <View className="gap-2">
            <Text className=" text-center text-xl text-primary-900 font-MontserratSemiBold">
              {title}
            </Text>
            <Text className=" text-center text-base text-primary-500 font-MontserratRegular">
              {text}
            </Text>
          </View>
          <View className="justify-between gap-3">
            {type === 'waring' && (
              <ButtonCostumized
                title={titleDeleteButton || ''}
                onPress={onPressDeleteButton}
                style={[styleButton, styles.styleDeleteButton]}
                textStyle={[styleText, styles.styleDeleteText]}
              />
            )}
            <ButtonCostumized
              title={titleButton || ''}
              onPress={onPressButton}
              style={[styleButton]}
              textStyle={[styleText]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
  },
  styleButton: {
    backgroundColor: colors.primary['100'],
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary['200'],
  },
  styleDeleteButton: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  styleTextButton: {
    color: colors.primary['900'],
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  styleDeleteText: {
    color: colors.primary[0],
  },
});
