import { Pressable, Text, StyleSheet } from "react-native";

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function ItemDeCompra({
  item,
  alPresionar,
  alMantener,
}: {
  item: Item;
  alPresionar: (id: string) => void;
  alMantener: (id: string) => void;
}) {
  return (
    <Pressable
      onPress={() => alPresionar(item.id)}
      onLongPress={() => alMantener(item.id)}
      style={styles.row}
    >
      {/* ✅ ACÁ ESTABA EL ERROR */}
      <Text style={[styles.texto, item.done && styles.done]}>
        {item.name}
      </Text>

      <Text style={styles.pill}>
        {item.done ? "✔" : "•"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  texto: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});