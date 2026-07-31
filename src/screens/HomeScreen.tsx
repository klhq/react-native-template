import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { useCounter } from '@/hooks/useCounter';
import type { TabScreenProps } from '@/navigation/types';

const ITEMS = [
  { id: 1, title: 'First item' },
  { id: 2, title: 'Second item' },
  { id: 3, title: 'Third item' },
];

export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.counterRow}>
        <Button label="-" onPress={decrement} accessibilityLabel="decrement" />
        <Text style={styles.count}>{count}</Text>
        <Button label="+" onPress={increment} accessibilityLabel="increment" />
      </View>
      <Button label="Reset" variant="secondary" onPress={reset} />

      <FlatList
        style={styles.list}
        data={ITEMS}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Button
            label={item.title}
            variant="secondary"
            onPress={() => navigation.navigate('Details', { itemId: item.id, title: item.title })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  count: {
    fontSize: 24,
    minWidth: 40,
    textAlign: 'center',
  },
  list: {
    marginTop: 8,
  },
  separator: {
    height: 12,
  },
});
