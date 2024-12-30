import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the RootStackParamList
export type RootStackParamList = {
  Login: undefined;
  Home: { username: string };
  Register: undefined;
};

// Type for Home screen props
export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
