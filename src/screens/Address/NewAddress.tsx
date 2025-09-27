import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCostumized from 'components/Header';

function NewAddress() {
  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized title="New Address" />
    </SafeAreaView>
  );
}

export default NewAddress;
