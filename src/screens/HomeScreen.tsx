import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import type { TabScreenProps } from '@/navigation/types';

const ITEMS = [
  { id: 1, title: 'First item' },
  { id: 2, title: 'Second item' },
  { id: 3, title: 'Third item' },
];

export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

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

      <Button label="Examples" onPress={() => navigation.navigate('Examples', undefined)} />
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
  list: {
    flex: 1,
  },
  separator: {
    height: 12,
  },
});
