import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';

export default function DetailsScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: title ?? 'Details' }} />
      <Text style={styles.title}>{title ?? 'Details'}</Text>
      <Text style={styles.subtitle}>Item id: {id}</Text>
      <Button label="Go back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});
