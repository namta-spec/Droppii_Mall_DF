import { Text, View } from 'react-native';
import { ReviewerType } from 'constants/type';
import Star from './Star';
import { formatTimeAgo } from 'lib/utils';

function ReviewItem({ item, index }: { item: ReviewerType; index: number }) {
  return (
    <View className="gap-4">
      {index !== 0 && <View className="w-full border-t border-primary-100" />}
      <View className="gap-3 flex-col items-start">
        <Star rating={item.rating} />
        <Text className="text-base text-primary-500 font-MontserratRegular">
          {item.review}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-primary-900 text-base font-MontserratSemiBold">
            {item.owner}
          </Text>
          <Text className="text-3xl text-primary-500">{'\u2022'}</Text>
          <Text className="text-primary-500 text-sm font-MontserratRegular">
            {formatTimeAgo(item.time)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ReviewItem;
