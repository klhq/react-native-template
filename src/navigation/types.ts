import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: undefined;
  Details: { itemId: number; title?: string };
  Examples: undefined;
};

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type TabScreenProps<Screen extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, Screen>,
  RootStackScreenProps<'Tabs'>
>;
