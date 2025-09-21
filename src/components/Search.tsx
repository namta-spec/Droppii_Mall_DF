import Icons from '../../assets/icons/index';
import { TextInput, View } from 'react-native';
type searchType = {
  placeholder: string;
  textSearch: string;
  autoFocus?: boolean;
  onChangeText: (text: string) => void;
};

function SearchCostumized({
  placeholder,
  textSearch,
  autoFocus,
  onChangeText,
}: searchType) {
  return (
    <View className="h-13 border border-primary-100 rounded-xl text-primary-900 flex-1 flex-row items-center justify-center px-6">
      <View className="flex-1 flex-row items-center gap-3">
        <Icons.Search color={textSearch ? '#1A1A1A' : '#999999'} />
        <TextInput
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={'#999999'}
          className="flex-1"
          onChangeText={onChangeText}
          defaultValue={textSearch}
        />
      </View>
      <Icons.Mic />
    </View>
  );
}

export default SearchCostumized;
