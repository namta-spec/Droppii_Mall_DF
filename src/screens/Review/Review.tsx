import HeaderCostumized from 'components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

function Review() {
  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized title="Reviews" />
    </SafeAreaView>
  );
}

export default Review;
