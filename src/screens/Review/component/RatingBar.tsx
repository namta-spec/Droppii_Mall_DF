import { View } from 'react-native';
import Star from './Star';

type RatingBarProps = {
  star: number;
  count: number;
  total: number;
};

export default function RatingBar({ star, count, total }: RatingBarProps) {
  const percent = total ? (count / total) * 100 : 0;

  return (
    <View className="flex-row items-center">
      <Star rating={star} />
      <View className="flex-1 h-1.5 bg-primary-100 mx-2 rounded-xl">
        <View
          className="h-full bg-primary-900 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </View>
    </View>
  );
}
