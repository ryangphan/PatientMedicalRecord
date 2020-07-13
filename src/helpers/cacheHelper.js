import {Cache} from 'react-native-cache';
import {AsyncStorage} from 'react-native';

export const userCache = new Cache({
  namespace: 'user',
  policy: {
    maxEntries: 1,
  },
  backend: AsyncStorage,
});
