import { cn } from 'lib/utils';
import Icons from '../../assets/icons/index';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ButtonCostumized from './Button';
import { memo } from 'react';

const heightScreen = Dimensions.get('window').height;

enum SizeType {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = '2XL',
  XXXL = '3XL',
  XXXXL = '4XL',
}

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
                    classNameButton={cn(
                      'bg-primary-0 h-16 w-16 justify-center items-center border border-primary-100',
                      {
                        'bg-primary-900 border-primary-900': isActive,
                      },
                    )}
                    classNameText={cn(
                      'text-primary-900 text-base font-MontserratMedium',
                      {
                        'text-primary-0': isActive,
                      },
                    )}
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
    height: heightScreen * 0.2,
  },
});

export default memo(SizeSelecter);
