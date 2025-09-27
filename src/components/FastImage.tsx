import { CachedImage } from '@georstat/react-native-image-cache';
import { ImageProps, ImageStyle } from 'react-native';

type FastImageProps = {
  source: string;
  thumbnailSource?: string;
  resizeMode?: ImageProps['resizeMode'];
  style?: ImageStyle[];
  imageStyle?: ImageStyle;
};

function FastImage({
  source,
  thumbnailSource,
  resizeMode,
  style,
  imageStyle,
}: FastImageProps) {
  return (
    <CachedImage
      resizeMode={resizeMode}
      style={style}
      imageStyle={imageStyle}
      source={source}
      thumbnailSource={thumbnailSource}
    />
  );
}

export default FastImage;
