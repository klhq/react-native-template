import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { useCounter } from '@/hooks/useCounter';

export default function ExamplesScreen() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examples</Text>
      <Text style={styles.hint}>Counter state via useCounter, plus both Button variants.</Text>

      <View style={styles.counterRow}>
        <Button label="-" onPress={decrement} accessibilityLabel="decrement" />
        <Text style={styles.count}>{count}</Text>
        <Button label="+" onPress={increment} accessibilityLabel="increment" />
      </View>
      <Button label="Reset" variant="secondary" onPress={reset} />
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
  hint: {
    color: '#666',
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
});
