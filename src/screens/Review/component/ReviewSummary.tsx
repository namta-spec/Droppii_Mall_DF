import { View, Text, FlatList, StyleSheet } from 'react-native';
import RatingBar from './RatingBar';
import { ReviewSummaryType } from 'constants/type';
import Star from './Star';
import { formatNumber } from 'lib/utils';

type StarProps = {
  star: number;
  count: number;
  total: number;
};

function convertToListStar(data: ReviewSummaryType): StarProps[] {
  const mapping: Record<number, number> = {
    1: data.numberOfOneStar,
    2: data.numberOfTwoStar,
    3: data.numberOfThreeStar,
    4: data.numberOfFourStar,
    5: data.numberOfFiveStar,
  };

  return [5, 4, 3, 2, 1].map(star => ({
    star,
    count: mapping[star],
    total: data.numberOfRatings,
  }));
}

function ReviewSummary({ dataSummary }: { dataSummary: ReviewSummaryType }) {
  function renderItem({ item }: { item: StarProps }) {
    return <RatingBar {...item} />;
  }

  return (
    <View className="gap-5">
      <View className="border-t border-primary-100" />
      <View className="flex-row gap-4 items-center">
        <Text className="text-6xl font-MontserratBold">
          {formatNumber(dataSummary.rating, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </Text>
        <View className="gap-1">
          <Star rating={dataSummary.rating} size={30} />
          <Text className="text-primary-500 font-MontserratRegular">
            {dataSummary.numberOfRatings} Ratings
          </Text>
        </View>
      </View>
      <FlatList
        data={convertToListStar(dataSummary)}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 5,
  },
});

export default ReviewSummary;
