import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { InputAuthName, InputStatus } from 'constants/type';
import Icons from '../../assets/icons/index';
import { colors } from 'constants/color';
import { cn } from 'lib/utils';

type InputFieldProps = {
  name: InputAuthName;
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string, name: InputAuthName) => void;
  secure?: boolean;
  status?: InputStatus;
  textError?: string;
};

function InputField({
  name,
  label,
  value,
  placeholder,
  onChangeText,
  secure,
  status = InputStatus.deafult,
  textError,
}: InputFieldProps) {
  const [openPass, setOpenPass] = useState(false);
  const handleChangeText = (text: string) => {
    onChangeText(text, name);
  };

  const handleChangeOpenPass = () => {
    setOpenPass(!openPass);
  };

  const getStatusIcon = (statusInput: InputStatus) => {
    switch (statusInput) {
      case InputStatus.error:
        return (
          <View className="absolute right-6">
            <Icons.WarningCircle />
          </View>
        );
      case InputStatus.success:
        return (
          <View className="absolute right-6">
            <Icons.Check />
          </View>
        );
      default:
        return <></>;
    }
  };

  return (
    <View className="gap-1">
      {label && (
        <Text className="font-MontserratMedium text-primary-900 text-base">
          {label}
        </Text>
      )}
      <View
        className={cn(
          'h-13 border border-primary-100 rounded-xl px-5 justify-center',
          {
            'border-green': status === InputStatus.success,
          },
          {
            'border-red': status === InputStatus.error,
          },
        )}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.primary['400']}
          className="flex-1 text-base font-MontserratRegular"
          onChangeText={handleChangeText}
          defaultValue={value}
          secureTextEntry={secure ? !openPass : false}
        />
        {getStatusIcon(status)}
        {secure && status === InputStatus.deafult && (
          <Pressable
            onPress={handleChangeOpenPass}
            className="absolute right-6"
          >
            {openPass ? <Icons.Eye /> : <Icons.EyeOff />}
          </Pressable>
        )}
      </View>
      {status === InputStatus.error && textError && (
        <Text className="text-red text-sm font-MontserratMedium">
          {textError}
        </Text>
      )}
    </View>
  );
}

export default InputField;
