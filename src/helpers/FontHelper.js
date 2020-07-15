import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export function normalize(size) {
  let scale;
  if (SCREEN_HEIGHT > 720) {
    scale = SCREEN_WIDTH / SCREEN_HEIGHT + 0.2;
  }
  else {scale = SCREEN_WIDTH / SCREEN_HEIGHT;}
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
