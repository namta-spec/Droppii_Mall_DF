import { colors } from 'constants/color';
import { Rating } from 'react-native-ratings';

type Props = {
  star?: number;
  rating: number | undefined;
  size?: number;
  readonly?: boolean;
};

export default function Star({
  star = 5,
  rating,
  size = 20,
  readonly = true,
}: Props) {
  return (
    <Rating
      type="custom"
      ratingCount={star}
      startingValue={rating}
      readonly={readonly}
      imageSize={size}
      ratingColor={colors.yellow}
      ratingBackgroundColor={colors.primary['100']}
      tintColor={colors.primary['0']}
    />
  );
}
