import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import type { RootStackScreenProps } from '@/navigation/types';

export function DetailsScreen({ route, navigation }: RootStackScreenProps<'Details'>) {
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? 'Details'}</Text>
      <Text style={styles.subtitle}>Item id: {itemId}</Text>
      <Button label="Go back" onPress={() => navigation.goBack()} />
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
