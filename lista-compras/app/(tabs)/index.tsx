import { ReactNode, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [texto, guardarTexto] = useState("");

  const agregarItemdeCompra = () => {
    const textoRecortado = texto.trim();
    if (!textoRecortado) return;
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), name: textoRecortado, done: false },
    ]);
    guardarTexto("");
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );
  };

  const EliminarItemdeCompra = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const TargetaParaItemdeCompra = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() => toggleItem(item.id)}
      onLongPress={() => EliminarItemdeCompra(item.id)}
      style={styles.row}
    >
           
      <Text style={[styles.rowText, item.done && styles.done]}>
              {item.name}     
      </Text>
           
      <Text
        style={[styles.pill, item.done ? styles.pillDone : styles.pillTodo]}
      >
              {item.done ? "✔" : "•"}     
      </Text>
         
    </Pressable>
  );

  return (
    <Contenedor>
      <TituloPagina></TituloPagina>
      <FormularioParaAgregarNuevoItem
        texto={texto}
        alIntroducirTexto={guardarTexto}
        alAgregarunItem={agregarItemdeCompra}
      />
    </Contenedor>
  );
}

const Contenedor = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const TituloPagina = () => {
  return <Text style={styles.title}>🛒 Lista de Compras</Text>;
};

const ListaDeCompras = ({
  items,
  ComponenteParaCadaItem,
}: {
  items: Item[];
  ComponenteParaCadaItem: ListRenderItem<Item> | null | undefined;
}) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={ComponenteParaCadaItem}
      ListEmptyComponent={
        <Text style={styles.empty}>Sin productos. ¡Agregá el primero! 😊</Text>
      }
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  );
};

const FormularioParaAgregarNuevoItem = ({
  texto,
  alIntroducirTexto,
  alAgregarunItem,
}: {
  texto: string;
  alIntroducirTexto: (texto: string) => void;
  alAgregarunItem: () => void;
}) => {
  return (
    <View style={styles.inputRow}>
             
      <TextInput
        value={texto}
        onChangeText={alIntroducirTexto}
        placeholder="Agregar producto (ej: Leche)"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={alAgregarunItem}
      />
             
      <Pressable style={styles.addBtn} onPress={alAgregarunItem}>
                 <Text style={styles.addTxt}>Agregar</Text>       
      </Pressable>
           
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 12 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "700",
  },
  pillTodo: { backgroundColor: "#eee", color: "#666" },
  pillDone: { backgroundColor: "#2ecc71", color: "#fff" },
  sep: { height: 1, backgroundColor: "#eee" },
  empty: { textAlign: "center", color: "#777", marginTop: 24 },
});

