import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import HeaderCostumized from 'components/Header';
import { MainStackParamList } from '../../../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useReview } from 'contexts/hooks/useReview';
import { ReviewType } from 'constants/type';
import { isEmpty } from 'lodash';
import ReviewItem from './component/ReviewItem';
import ReviewSummary from './component/ReviewSummary';
import Icons from '../../../assets/icons';

type Props = NativeStackScreenProps<MainStackParamList, 'Review'>;

function Review({ route }: Props) {
  const { dataReview } = useReview(route.params.idProduct || null);
  const [review, setReview] = useState<ReviewType | null>(null);

  useEffect(() => {
    if (dataReview) {
      setReview(dataReview);
    }
  }, [dataReview]);

  function renderHeaderComponent() {
    if (!isEmpty(review) && !isEmpty(review.reviewSummary))
      return (
        <View className="gap-6">
          <ReviewSummary dataSummary={review.reviewSummary} />
          <View className="gap-4">
            <View className="border-t border-primary-100" />
            <View className="flex-row justify-between items-center">
              <Text className="text-lg text-primary-900 font-MontserratBold">
                {review.reviewSummary.numberOfReview} Reviews
              </Text>
              <Pressable className="flex-row gap-1 items-center">
                <Text className="text-primary-500 text-sm font-MontserratMedium">
                  Most Relevant
                </Text>
                <Icons.ChevronDown />
              </Pressable>
            </View>
          </View>
        </View>
      );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <HeaderCostumized title="Reviews" />
      <View className="flex-1 px-6">
        {!isEmpty(review) && !isEmpty(review.listReview) && (
          <FlatList
            data={review.listReview}
            renderItem={ReviewItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeaderComponent}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 16,
  },
});

export default Review;
