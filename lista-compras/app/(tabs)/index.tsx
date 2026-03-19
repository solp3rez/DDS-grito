import { Children, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');

  const agregarItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), name: trimmed, done: false },
    ]);
    setText('');
  };

  const AltenarElemento = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );
  };

  const eliminarItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const TarjetaParaItemDeCompra = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() => AltenarElemento(item.id)}
      onLongPress={() => eliminarItem(item.id)}
      style={styles.row}
    >
      <Text style={[styles.rowText, item.done && styles.done]}>
        {item.name}
      </Text>
      <Text style={[styles.pill, item.done ? styles.pillDone : styles.pillTodo]}>
        {item.done ? '✔' : '•'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lista de Compras</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Agregar producto (ej: Leche)"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={agregarItem}
        />
        <Pressable style={styles.addBtn} onPress={agregarItem}>
          <Text style={styles.addTxt}>Agregar</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={TarjetaParaItemDeCompra}
        ListEmptyComponent={
          <Text style={styles.empty}>Sin productos. ¡Agregá el primero! 😊</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </Contenedor>
  );
}
 const Contenedor =({children} : {Children: ReactNode})  => {
  return <View style={styles.container}>{children}</View>;
 };
 const TituloDeLaPagina = () => {
  return <Text style={styles.title}>Lista de Compras</Text>;
 }
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTxt: { color: '#fff', fontWeight: '600' },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: '#999' },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
  pillTodo: { backgroundColor: '#eee', color: '#666' },
  pillDone: { backgroundColor: '#2ecc71', color: '#fff' },
  sep: { height: 1, backgroundColor: '#eee' },
  empty: { textAlign: 'center', color: '#777', marginTop: 24 },
});