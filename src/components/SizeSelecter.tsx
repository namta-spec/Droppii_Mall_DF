import { useState, memo } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ButtonCostumized from './Button';
import Icons from '../../assets/icons/index';
import { SCREEN_HEIGHT } from 'constants/screens';
import { SizeType } from 'constants/type';
import { colors } from 'constants/color';

type SizeSelecterType = {
  size: SizeType | null;
  setSize: (size: SizeType) => void;
};

const dataSize: SizeType[] = [
  SizeType.S,
  SizeType.M,
  SizeType.L,
  SizeType.XL,
  SizeType.XXL,
  SizeType.XXXL,
  SizeType.XXXXL,
];

function SizeSelecter({ size, setSize }: SizeSelecterType) {
  const [modalVisible, setModalVisible] = useState(false);

  const onOpenModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChangeValue = (item: SizeType) => {
    setSize(item);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 gap-4 px-6">
      <View className={'border-t border-primary-100'} />
      <View className="flex-row justify-between">
        <Text className="font-MontserratSemiBold text-primary-900 text-base">
          Size
        </Text>
        <Pressable
          className="flex-row pl-12 justify-center items-center gap-1"
          onPress={onOpenModal}
        >
          <Text className="font-MontserratRegular text-primary-500 text-base">
            {size || 'Select size'}
          </Text>
          <Icons.ChevronDown />
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        statusBarTranslucent
        visible={modalVisible}
        backdropColor={'#00000033'}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View
            style={styles.modalView}
            className="pl-6 bg-primary-0 rounded-t-3xl items-end"
          >
            <Pressable onPress={closeModal} className="pr-6 pt-6">
              <Icons.Cancel />
            </Pressable>
            <FlatList
              horizontal={true}
              data={dataSize}
              contentContainerStyle={styles.contentContainerStyle}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: SizeType }) => {
                const isActive = item === size;

                return (
                  <ButtonCostumized
                    title={item}
                    onPress={() => handleChangeValue(item)}
                    style={[
                      styles.buttonStyle,
                      isActive ? styles.buttonActiveStyle : {},
                    ]}
                    textStyle={[
                      styles.textStyle,
                      isActive ? styles.textActiveStyle : {},
                    ]}
                  />
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 10,
    alignItems: 'center',
  },
  centeredView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
  },
  modalView: {
    height: SCREEN_HEIGHT * 0.2,
  },
  buttonStyle: {
    backgroundColor: colors.primary['0'],
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary['100'],
  },
  buttonActiveStyle: {
    borderColor: colors.primary['900'],
    backgroundColor: colors.primary['900'],
  },
  textStyle: {
    color: colors.primary['900'],
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  textActiveStyle: {
    color: colors.primary['100'],
  },
});

export default memo(SizeSelecter);
