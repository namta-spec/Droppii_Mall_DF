import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCostumized from 'components/Header';

function NewCard() {
  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized title="New Card" />
    </SafeAreaView>
  );
}

export default NewCard;
