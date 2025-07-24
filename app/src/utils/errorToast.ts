import { Alert, Platform, ToastAndroid } from 'react-native';

export function showError(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert('Error', message);
  }
} 