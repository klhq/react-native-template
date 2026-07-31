import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailsScreen } from '@/screens/DetailsScreen';
import { ExamplesScreen } from '@/screens/ExamplesScreen';
import { TabNavigator } from '@/navigation/TabNavigator';
import type { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({ title: route.params.title ?? 'Details' })}
        />
        <Stack.Screen name="Examples" component={ExamplesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
